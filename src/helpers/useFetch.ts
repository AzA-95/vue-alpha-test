// Внимание код не готово для продакшена так как тут упушено много моментов
// Скрипт написан чисто для тетового проекта без подключения готовых модулей как пример axios
// Так как по требованию тестового задания запрешено использовать готовые решения

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Options = {
	baseUrl?: string;
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	timeout?: number;
	retries?: number;
};

const defaultOptions: Options = {
	baseUrl: BASE_URL || '/',
	method: 'GET',
	timeout: 8000,
	retries: 3,
};

class NotFoundPageError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotFoundError';
	}
}

const fetchWithTimeout = async (url: string, options: Options) => {
	const { timeout } = options;
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);

	const response = await fetch(url, {
		...options,
		signal: controller.signal,
	});

	if (!response.ok) {
		const statusCode = response.status;

		if (statusCode >= 400 && statusCode <= 500) {
			throw new NotFoundPageError(response.statusText);
		} else {
			throw new Error(response.statusText);
		}
	}

	const data = await response.json();

	clearTimeout(id);

	return data;
};

export const useFetch = <DataType>(url: string, options?: Options) => {
	let calledRetries = 0;
	let lastError: unknown = null;
	const normalizedOptions = {
		...defaultOptions,
		...options,
	} as Required<Options>;
	const normalizedUrl = `${normalizedOptions.baseUrl}${url}`;

	const executeFetch = (): Promise<DataType> => {
		if (normalizedOptions.retries > calledRetries) {
			return fetchWithTimeout(normalizedUrl, normalizedOptions)
				.then((data: DataType) => {
					return data;
				})
				.catch((e) => {
					if (e instanceof NotFoundPageError) {
						return Promise.reject(e);
					}

					calledRetries += 1;
					lastError = e;
					return executeFetch();
				});
		} else {
			return Promise.reject(lastError);
		}
	};

	return executeFetch();
};
