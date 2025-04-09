const url = 'https://norma.nomoreparties.space/';

export const request = (endpoint, options) => {
	console.log(url + endpoint);
	console.log(options);
	return fetch(url + endpoint, options).then((res) => {
		if (!res.ok) {
			return Promise.reject('Ошибка ' + res.status);
		}
		return res.json();
	});
};
