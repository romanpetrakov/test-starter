import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from './action';

const initialState = {
	ingredientsFetching: false,
	ingredientsSuccessFetching: false,
	ingredientsFailedFetching: false,
	ingredients: [],
};

export const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS:
			return {
				...state,
				ingredientsFetching: true,
				ingredientsFailedFetching: false,
			};

		case GET_INGREDIENTS_SUCCESS:
			return {
				...state,
				ingredients: action.ingredients,
				ingredientsFetching: false,
				ingredientsSuccessFetching: true,
			};

		case GET_INGREDIENTS_FAILED:
			return {
				...state,
				ingredientsFetching: false,
				ingredientsFailedFetching: true,
			};

		default:
			return state;
	}
};
