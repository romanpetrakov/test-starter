
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (!res.ok) {
		const errorText = await res.text(); // Пытаемся прочитать текст ошибки
		throw new Error(errorText || `HTTP Error ${res.status}`);
	  }


	return await res.json();
};
