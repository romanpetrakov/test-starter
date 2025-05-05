
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(errorText);
	  }


	return res.json();
};


export const requestWithAuth = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const accessToken = localStorage.getItem('accessToken');
	options.headers.authorization = `${accessToken}`;
	try {
		const res = await fetch(`${BASE_URL}${url}`, options);
		return await checkReponse(res);
	} catch (err: any) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}};
