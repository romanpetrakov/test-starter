import { getFromStorage } from "./storage";

const baseUrl = 'https://norma.nomoreparties.space/';

export const refreshToken = () => {

	const refreshToken = getFromStorage
	return (
		fetch(`${BASE_URL}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		})
			.then(checkReponse)
			// !! Важно для обновления токена в мидлваре, чтобы запись токенов
			// была тут, а не в fetchWithRefresh
			.then((refreshData) => {
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken);
				return refreshData;
			})
	);
};

export const request = async (endpoint, options) => {

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	return res.ok
		? res.json()
		: res.json().then((err) => Promise.reject(err));
	// if (!res.ok) {
	// 	const errorText = await res.text();
	// 	throw new Error(errorText);
	//   }


	// return res.json();
};

export const requestWithAuth = async (endpoint, options) => {
	const accessToken = localStorage.getItem('accessToken');
	options.headers.authorization = accessToken;
	try {
		return res = await request(endpoint, options);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await request(res);
		} else {
			return Promise.reject(err);
		}
	}};
