
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (!res.ok) {
		return res.json();
	}
		return response.json().then(response => {throw new Error(response.error)})
	}

	if (res.headers.get('content-type')?.includes('application/json')) {

	}

	return res.text();
};
