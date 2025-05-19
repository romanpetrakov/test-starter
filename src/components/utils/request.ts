import { API_TOKEN_REFRESH } from './endpoints';
import { getFromStorage, setToStorage } from './storage';

const baseUrl = 'https://norma.nomoreparties.space/';

// Типы для токенов
type TTokenResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
};

type TErrorResponse = {
	success: boolean;
	message: string;
	[key: string]: unknown;
};

// Типы для функции request
type TRequestOptions = {
	method?: string;
	headers?: Record<string, string>;
	body?: string;
	[key: string]: unknown;
};

export const refreshToken = async (): Promise<TTokenResponse> => {
	const token = getFromStorage<string>('refreshToken');

	return request<TTokenResponse>(API_TOKEN_REFRESH, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: token,
		}),
	}).then((refreshData) => {
		if (!refreshData.success) {
			return Promise.reject(refreshData);
		}
		setToStorage('refreshToken', refreshData.refreshToken);
		setToStorage('accessToken', refreshData.accessToken);

		return refreshData;
	});
};

export const request = async <T = unknown>(
	endpoint: string,
	options: TRequestOptions
): Promise<T> => {
	const res = await fetch(`${baseUrl}${endpoint}`, options);
	if (!res.ok) {
		const error: TErrorResponse = await res.json();
		return Promise.reject(error);
	}

	return res.json() as Promise<T>;
};

export const requestWithAuth = async <T = unknown>(
	endpoint: string,
	options: TRequestOptions = {}
): Promise<T> => {
	const headers: Record<string, string> = options.headers || {};

	headers.Authorization = getFromStorage<string>('accessToken') || '';

	try {
		return await request<T>(endpoint, {
			...options,
			headers,
		});
	} catch (err) {
		const error = err as TErrorResponse;
		if (error.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			headers.Authorization = refreshData.accessToken;
			return await request<T>(endpoint, {
				...options,
				headers,
			});
		} else {
			console.log(err);
			return Promise.reject(error.message || 'Unknown error');
		}
	}
};
