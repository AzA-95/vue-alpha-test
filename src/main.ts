import './assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { lazyLoad } from '@/directives/v-lazy';

import App from './App.vue';
import router from './router';
import { showErrorPage } from './helpers/showErrorPage';

const isDev = import.meta.env.DEV;
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.directive('lazy', lazyLoad);

// Here it would be possible to use sentry.io instead
if (!isDev) {
	app.config.errorHandler = (error) => {
		// logger.sendError({
		// 	message: error.message,
		// 	stack: error.stack
		// });
		showErrorPage({
			statusCode: 500,
			message: 'Что то пошло не так',
		});
	};

	window.addEventListener('error', ({ error }) => {
		// logger.sendError({
		// 	message: error.message,
		// 	stack: error.stack
		// });
	});
}

// Without router.isReady() the router will be undefined when the page is first loaded
// See detail https://github.com/vuejs/vue-router/issues/3518
router.isReady().then(() => {
	app.mount('#app');
});
