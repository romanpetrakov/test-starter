
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (!res || !res.ok) {
		console
		throw new Error('Ошибка ' + res.status);
	}

	if (res.headers.get('content-type')?.includes('application/json')) {
		return res.json();
	}

	return res.text();
};
