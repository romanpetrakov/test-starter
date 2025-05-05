
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (!res || !res.ok) {
		throw new Promise.reject('Ошибка ' + res.status);
	}

	if (res.headers.get('content-type')?.includes('application/json')) {
		return res.json();
	}

	return res.text();
};
