import type { RouteLocationNormalized } from 'vue-router';

export default (to: RouteLocationNormalized) => {
	console.log('Global middleware executed');
};
