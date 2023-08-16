import type { ErrorApiType } from '@/types/errors';

import router from '@/router';
import { useErrorPageState } from '@/stores/useErrorPage';

// The showErrorPage method is used to show the error page
// If the api responded with a 404 or 500 error, etc.
export const showErrorPage = (errorData: ErrorApiType) => {
	// Here the useRouter hook is not available see https://github.com/vuejs/router/issues/257
	// For this reason, we import directly router
	const route = router.currentRoute.value;

	const state = useErrorPageState();
	state.setErrors(errorData);

	router.push({
		name: 'error',
		// preserve current path and remove the first char to avoid the target URL starting with `//`
		params: {
			pathMatch: route.path.substring(1).split('/'),
		},
		query: route.query,
		hash: route.hash,
	});
};
