// Тип для значений, которые можно сохранять в localStorage
type TStorageValue = string | number | boolean | object;

export const setToStorage = (key: string, value: TStorageValue): void => {
	const storageValue =
		typeof value === 'string' ? value : JSON.stringify(value);
	localStorage.setItem(key, storageValue);
};

export const getFromStorage = <T extends TStorageValue>(
	key: string
): T | null => {
	const item = localStorage.getItem(key);
	if (item === null) {
		return null;
	}

	try {
		// Пытаемся распарсить (на случай если это JSON)
		return JSON.parse(item) as T;
	} catch {
		// Если не JSON, возвращаем как строку
		return item as T;
	}
};

export const removeFromStorage = (key: string): void => {
	localStorage.removeItem(key);
};
