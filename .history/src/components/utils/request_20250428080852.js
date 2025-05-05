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
		: res.json().then((err) => Promise.reject(err));
	// if (!res.ok) {
	// 	const errorText = await res.text();
	// 	throw new Error(errorText);
	//   }


	// return res.json();
};

export const requestWithAuth = async (endpoint, options) => {
	console.log('requestWithAuth');
	const accessToken = localStorage.getItem('accessToken');
	console.log(accessToken);
	options.headers.authorization = accessToken;
	try {
		console.log('requestWithAuth1');
		res = await request(endpoint, options);
		console.log(res);
		return res
	} catch (err) {
		console.log('requestWithAuth1');
		console.log(err);
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await request(endpoint, options);
		} else {
			return Promise.reject(err);
		}
	}};
