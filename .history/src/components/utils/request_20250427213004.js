
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (!res.ok) {
		const errorText = await res.text();
		errorText
		console.log()
		throw new Error(errorText);
	  }


	return res.json();
};
