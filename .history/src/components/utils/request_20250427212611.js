
export const request = async (endpoint, options) => {
	const baseUrl = 'https://norma.nomoreparties.space/';

	const res = await fetch(`${baseUrl}${endpoint}`, options);

	if (!res.ok) {
		const errorText = await res.text(); // Пытаемся прочитать текст ошибки
		throw new Error(errorText || `HTTP Error ${res.status}`);
	  }
	  
	if (res.ok) {
		return res.json();
	}

	return await res.json();
};
