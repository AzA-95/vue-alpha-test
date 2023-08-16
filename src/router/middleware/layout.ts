import type { RouteLocationNormalized } from 'vue-router';
import type { LayoutsNameType } from '@/types/layout';

import { getFileNameWithoutExtension } from '@/helpers/utils';

const layoutToFileMap: Record<LayoutsNameType, string> = {
	default: 'AppLayoutDefault.vue',
	error: 'AppLayoutError.vue',
} as const;

export const resolveLayout = async (
	route: RouteLocationNormalized,
): Promise<void> => {
	const { layout } = route.meta;
	const layoutName: LayoutsNameType = layout || 'default';
	const fileName = layoutToFileMap[layoutName];
	const fileNameWithoutExtension = getFileNameWithoutExtension(fileName);
	// Without a static file extension, importing a file with an alias will not work
	// See detail https://github.com/vite-plugin/vite-plugin-dynamic-import#readme
	const component = await import(`@/layouts/${fileNameWithoutExtension}.vue`);
	route.meta.layoutComponent = component.default;
};
