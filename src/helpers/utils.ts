export const getFileNameFromPath = (path: string): string => {
	const splitedPath = path.split('/');
	const fileName = splitedPath[splitedPath.length - 1];
	return fileName;
};

export const getFileNameWithoutExtension = (fileName: string): string => {
	return fileName.replace(/[.][a-z]+$/, '');
};

export const isPromise = (p: unknown): boolean => {
	if (
		p !== null &&
		typeof p === 'object' &&
		// @ts-ignore
		typeof p.then === 'function' &&
		// @ts-ignore
		typeof p.catch === 'function'
	) {
		return true;
	}

	return false;
};
