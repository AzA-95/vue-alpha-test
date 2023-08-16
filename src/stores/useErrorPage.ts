import type { ErrorApiType } from '@/types/errors';

import { shallowRef } from 'vue';
import { defineStore } from 'pinia';

export const useErrorPageState = defineStore('error', () => {
	const errors = shallowRef<ErrorApiType | null>(null);

	function setErrors(errorsData: ErrorApiType) {
		errors.value = errorsData;
	}

	function clearErrors() {
		errors.value = null;
	}

	return { errors, setErrors, clearErrors };
});
