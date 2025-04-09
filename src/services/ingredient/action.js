export const SET_INGREDIENT = 'SET_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export function setIngredient(ingredient) {
	return function (dispatch) {
		dispatch({
			type: SET_INGREDIENT,
			ingredient: ingredient,
		});
	};
}

export function removeIngredient() {
	return function (dispatch) {
		dispatch({
			type: REMOVE_INGREDIENT,
		});
	};
}
