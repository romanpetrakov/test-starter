export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SET_BUN = 'SET_BUN';
export const REMOVE_BUN = 'SET_BUN';
export const CHANGE_ORDER = 'CHANGE_ORDER';

export const addItem = (ingredient) => {
	return function (dispatch) {
		dispatch({
			type: ADD_ITEM,
			ingredient: ingredient,
		});
	};
};

export const removeItem = (ingredient) => {
	return function (dispatch) {
		dispatch({
			type: REMOVE_ITEM,
			ingredient: ingredient,
		});
	};
};

export const setBun = (ingredient) => {
	return function (dispatch) {
		dispatch({
			type: SET_BUN,
			bun: ingredient,
		});
	};
};

export const removeBun = () => {
	return function (dispatch) {
		dispatch({
			type: REMOVE_BUN,
		});
	};
};

export const changeOrder = (ingredients) => {
	return function (dispatch) {
		dispatch({
			type: CHANGE_ORDER,
			ingredients: ingredients,
		});
	};
};
