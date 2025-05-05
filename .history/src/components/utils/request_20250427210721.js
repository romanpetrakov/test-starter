
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (!res || !res.ok) {
		debugger;
		throw new Error(await res.text());
	}

	if (res.headers.get('content-type')?.includes('application/json')) {
		return res.json();
	}

	return res.text();
};
