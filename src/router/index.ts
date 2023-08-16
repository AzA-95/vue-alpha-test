import type { RouteLocationNormalized } from 'vue-router';

import { createRouter, createWebHistory } from 'vue-router';
import { resolveLayout } from './middleware/layout';
import { baseMiddleware } from '@/router/middleware';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: () => import('@/pages/Home.vue'),
		},
		{
			path: '/auth',
			name: 'auth',
			component: () => import('@/pages/Auth.vue'),
			meta: {
				middleware: ['auth'],
			},
		},
		{
			path: '/:pathMatch(.*)*',
			// Do not change the name parameter, it's used in the helpers/showErrorPage method
			name: 'error',
			component: () => import('@/pages/Error.vue'),
			meta: {
				layout: 'error',
			},
		},
	],
});

router.beforeEach(
	(to: RouteLocationNormalized, from: RouteLocationNormalized) => {
		return baseMiddleware(to, from).then(async (data: any) => {
			// Execute init layout page after executed middlewares
			await resolveLayout(to);
			return data;
		});
	},
);

export default router;
