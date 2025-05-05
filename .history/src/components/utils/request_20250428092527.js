import { API_TOKEN_REFRESH } from "./endpoints";
import { getFromStorage, setToStorage } from "./storage";

const baseUrl = 'https://norma.nomoreparties.space/';

export const refreshToken = () => {

	const token = getFromStorage('refreshToken')

	return (
		request(API_TOKEN_REFRESH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: token,
			}),
		})
			.then((refreshData) => {
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				setToStorage('refreshToken', refreshData.refreshToken);
				setToStorage('accessToken', refreshData.accessToken);

				return refreshData;
			})
	);
};

export const request = async (endpoint, options) => {

	const res = await fetch(`${baseUrl}${endpoint}`, options);

return res.ok
		? res.json()
		: res.json().then((err: any) => Promise.reject(err));
};

export const requestWithAuth = async (endpoint, options) => {

	console.log('requestWithAuth');

	const accessToken = localStorage.getItem('accessToken');
	options.headers.Authorization = accessToken;
	try {
		console.log(options);

		res = await request(endpoint, options);
		return res;
	} catch (err) {
		if (err.message === 'jwt expired') {
			console.log('requestWithAuth3');
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await request(endpoint, options);
		} else {
			console.log('requestWithAuth4');
			console.log(err);
			return Promise.reject(err);
		}
	}};
