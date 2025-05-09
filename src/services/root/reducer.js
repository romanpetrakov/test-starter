import { combineReducers } from 'redux';
import { selectedIngredientsReducer } from '../selected-ingredients/reducer.js';
import { ingredientsReducer } from '../ingredients/reducer.js';
import { ingredientReducer } from '../ingredient/reducer.js';
import { orderReducer } from '../order/reducer.js';
import { authReducer } from '../auth/reducer.js';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	selectedIngredients: selectedIngredientsReducer,
	ingredient: ingredientReducer,
	order: orderReducer,
	auth: authReducer,
});
