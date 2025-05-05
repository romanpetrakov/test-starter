
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (!res.ok) {
	}
		console.log(res);
		return response.json().then(response => {throw new Error(response.error)})
	}

	if (res.headers.get('content-type')?.includes('application/json')) {

	}

	return res.text();
};
