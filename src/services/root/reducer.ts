import { combineReducers } from 'redux';
import { selectedIngredientsReducer } from '../selected-ingredients/reducer';
import { ingredientsReducer } from '../ingredients/reducer';
import { ingredientReducer } from '../ingredient/reducer';
import { orderReducer } from '../order/reducer';
import { authReducer } from '../auth/reducer';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	selectedIngredients: selectedIngredientsReducer,
	ingredient: ingredientReducer,
	order: orderReducer,
	auth: authReducer,
});
