import { TIngredient } from '../../components/utils/types';
import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
	TIngredientsActions,
} from './action';

export type TIngredientsState = {
	ingredients: TIngredient[];
	ingredientsFetching: boolean;
	ingredientsSuccessFetching: boolean;
	ingredientsFailedFetching: boolean;
};

const initialState: TIngredientsState = {
	ingredients: [],
	ingredientsFetching: false,
	ingredientsSuccessFetching: false,
	ingredientsFailedFetching: false,
};
export const ingredientsReducer = (
	state: TIngredientsState = initialState,
	action: TIngredientsActions
): TIngredientsState => {
	switch (action.type) {
		case GET_INGREDIENTS: {
			return {
				...state,
				ingredientsFetching: true,
				ingredientsFailedFetching: false,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				ingredients: action.ingredients,
				ingredientsFetching: false,
				ingredientsSuccessFetching: true,
			};
		}
		case GET_INGREDIENTS_FAILED: {
			return {
				...state,
				ingredientsFetching: false,
				ingredientsFailedFetching: true,
			};
		}
		default: {
			return state;
		}
	}
};
