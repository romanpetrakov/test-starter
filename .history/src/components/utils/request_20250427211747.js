
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (res.ok) {
		return res.json();
	}

	return res.json().then(res => {throw new Error(res.error)})
};
