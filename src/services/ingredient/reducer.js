import { SET_INGREDIENT, REMOVE_INGREDIENT } from './action.js';

const initialState = {
	ingredient: null,
	showModal: false,
};

export const ingredientReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INGREDIENT:
			return {
				...state,
				ingredient: action.ingredient,
				showModal: true,
			};

		case REMOVE_INGREDIENT:
			return {
				...state,
				ingredient: null,
				showModal: false,
			};

		default:
			return state;
	}
};
