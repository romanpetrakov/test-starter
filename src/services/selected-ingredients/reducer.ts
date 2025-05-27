import { TIngredient } from '../../components/utils/types';
import {
	ADD_ITEM,
	REMOVE_ITEM,
	SET_BUN,
	REMOVE_BUN,
	CHANGE_ORDER,
	TSelectIngredientActions,
} from './action';

export type TSelectIngredientsState = {
	bun: TIngredient | null;
	ingredients: TIngredient[];
};

const initialState = {
	bun: null as TIngredient | null,
	ingredients: [] as TIngredient[],
};

export const selectedIngredientsReducer = (
	state: TSelectIngredientsState = initialState,
	action: TSelectIngredientActions
) => {
	switch (action.type) {
		case ADD_ITEM:
			return {
				...state,
				ingredients: [...state.ingredients, action.ingredient],
			};

		case REMOVE_ITEM:
			return {
				...state,
				ingredients: state.ingredients.filter(
					(item) => item.uniqueId !== action.ingredient.uniqueId
				),
			};

		case SET_BUN:
			return { ...state, bun: action.bun };

		case REMOVE_BUN:
			return { ...state, bun: null };

		case CHANGE_ORDER:
			return { ...state, ingredients: action.ingredients };

		default:
			return state;
	}
};
