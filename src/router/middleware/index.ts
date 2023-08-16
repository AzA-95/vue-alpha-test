import type { RouteLocationNormalized } from 'vue-router';
import {
	getFileNameFromPath,
	getFileNameWithoutExtension,
} from '@/helpers/utils';

type ModulePromiseType = () => Promise<{
	default: (
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
	) => unknown;
}>;
type ModuleType = Record<string, ModulePromiseType>;
type NormalizedModuleType = { path: string; module: ModulePromiseType };

// Vite specific import glob
const middlewareModules = import.meta.glob('@/middleware/*.ts') as ModuleType;

const isGlobalMiddleware = (fileName: string): boolean => {
	const fileNameWithoutExtension = getFileNameWithoutExtension(fileName);
	return fileNameWithoutExtension.endsWith('global');
};

const getGlobalMiddlewareModules = (
	modules: ModuleType,
): Array<NormalizedModuleType> => {
	const globalMiddlewareModules: Array<NormalizedModuleType> = [];

	for (const path in modules) {
		const fileName = getFileNameFromPath(path);

		if (isGlobalMiddleware(fileName)) {
			globalMiddlewareModules.push({
				path: path,
				module: modules[path],
			});
		}
	}

	return globalMiddlewareModules;
};

const findMiddlewareModuleByName = (
	moduleName: string,
	modules: ModuleType,
): NormalizedModuleType | null => {
	const modulesKeys = Object.keys(modules);

	for (const path of modulesKeys) {
		const fileName = getFileNameFromPath(path);
		const fileNameWithoutExtension = getFileNameWithoutExtension(fileName);

		if (fileNameWithoutExtension === moduleName) {
			return { path, module: modules[path] };
		}
	}

	return null;
};

const normalizeMiddlewares = (
	route: RouteLocationNormalized,
	globalMiddlewares: Array<NormalizedModuleType>,
	middlewareModules: ModuleType,
) => {
	const result: Array<NormalizedModuleType> = [...globalMiddlewares];
	const middlewareNames = route.meta.middleware;

	if (middlewareNames && middlewareNames.length > 0) {
		middlewareNames.forEach((middlewareName: string) => {
			const middleware = findMiddlewareModuleByName(
				middlewareName,
				middlewareModules,
			);

			if (middleware !== null) {
				result.push(middleware);
				return;
			}

			console.error(`Middleware with name ${middlewareName} not found`);
		});
	}

	return result;
};

// Execute sort once and cache result
const globalMiddlewareModules = getGlobalMiddlewareModules(middlewareModules);

export const baseMiddleware = async (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
) => {
	for (const middleware of normalizeMiddlewares(
		to,
		globalMiddlewareModules,
		middlewareModules,
	)) {
		const module = middleware['module'];

		// Load middleware by lazy load and then execute
		const loadedModule = await module();
		const moduleFunction = loadedModule.default;
		// might be Asynchronous
		const result = await moduleFunction(to, from);

		// Stop execute next chain middlewares if middleware return anything exclude true and undefined
		if (result !== undefined && result !== true) {
			return result;
		}
	}
};
