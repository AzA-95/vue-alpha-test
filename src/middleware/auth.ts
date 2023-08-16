import type { RouteLocationNormalized } from 'vue-router';

export default (to: RouteLocationNormalized) => {
	console.log('Auth middleware executed');

	if (to.path === '/auth') {
		// Редиректит на главную страницу
		return { name: 'main' };

		// Редиректит на главную страницу с задержкой в 4 секунды типа имитация ответа сервера
		// return new Promise((resolve) => {
		// 	setTimeout(() => {
		// 		console.log('wait');
		// 		resolve({name: 'main'});
		// 	}, 4000);
		// });
	}
};
