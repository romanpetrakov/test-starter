import { TIngredient } from '../../components/utils/types';
import {
	SET_INGREDIENT,
	REMOVE_INGREDIENT,
	TIngredientActions,
} from './action';

type TIngredientState = {
	ingredient: TIngredient | null;
	showModal: boolean;
};

const initialState = {
	ingredient: null,
	showModal: false,
};

export const ingredientReducer = (
	state: TIngredientState = initialState,
	action: TIngredientActions
) => {
	switch (action.type) {
		case SET_INGREDIENT: {
			return {
				...state,
				ingredient: action.ingredient,
				showModal: true,
			};
		}
		case REMOVE_INGREDIENT: {
			return {
				...state,
				ingredient: null,
				showModal: false,
			};
		}
		default: {
			return state;
		}
	}
};
