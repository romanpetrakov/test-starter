import {
	ADD_ITEM,
	REMOVE_ITEM,
	SET_BUN,
	REMOVE_BUN,
	CHANGE_ORDER,
} from './action.js';

const initialState = {
	bun: null,
	ingredients: [],
};

export const selectedIngredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM: {
			return {
				...state,
				ingredients: [...state.ingredients, action.ingredient],
			};
		}
		case REMOVE_ITEM: {
			console.log(action.ingredient);
			console.log([
				...state?.ingredients?.filter(
					(elem) => elem.uniqueId !== action.ingredient
				),
			]);
			return {
				...state,
				ingredients: [
					...state?.ingredients?.filter(
						(elem) => elem.uniqueId !== action.ingredient.uniqueId
					),
				],
			};
		}
		case CHANGE_ORDER: {
			return {
				...state,
				ingredients: action.ingredients,
			};
		}
		case SET_BUN: {
			return {
				...state,
				bun: action.bun,
			};
		}
		case REMOVE_BUN: {
			return {
				...state,
				bun: null,
			};
		}

		default: {
			return state;
		}
	}
};
