import { TIngredient } from '../../components/utils/types';
import { ingredientsReducer, TIngredientsState, initialState } from './reducer';
import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from './action';

describe('ingredients reducer', () => {
	const mockIngredient: TIngredient = {
		_id: '123',
		name: 'Test Ingredient',
		type: 'main',
		proteins: 10,
		fat: 5,
		carbohydrates: 15,
		calories: 100,
		price: 50,
		image: 'image-url',
		image_mobile: 'mobile-image-url',
		image_large: 'large-image-url',
		__v: 0,
	};

	it('should return the initial state', () => {
		expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle GET_INGREDIENTS', () => {
		expect(ingredientsReducer(initialState, { type: GET_INGREDIENTS })).toEqual(
			{
				...initialState,
				ingredientsFetching: true,
				ingredientsFailedFetching: false,
			}
		);
	});

	it('should handle GET_INGREDIENTS_SUCCESS', () => {
		const ingredients = [mockIngredient];
		const loadingState: TIngredientsState = {
			...initialState,
			ingredientsFetching: true,
		};

		expect(
			ingredientsReducer(loadingState, {
				type: GET_INGREDIENTS_SUCCESS,
				ingredients: ingredients,
			})
		).toEqual({
			...loadingState,
			ingredients: ingredients,
			ingredientsFetching: false,
			ingredientsSuccessFetching: true,
		});
	});

	it('should handle GET_INGREDIENTS_FAILED', () => {
		const loadingState: TIngredientsState = {
			...initialState,
			ingredientsFetching: true,
		};

		expect(
			ingredientsReducer(loadingState, { type: GET_INGREDIENTS_FAILED })
		).toEqual({
			...loadingState,
			ingredientsFetching: false,
			ingredientsFailedFetching: true,
		});
	});

	it('should return current state for unknown action', () => {
		const currentState: TIngredientsState = {
			...initialState,
			ingredients: [mockIngredient],
		};

		expect(
			ingredientsReducer(currentState, { type: 'UNKNOWN_ACTION' } as any)
		).toEqual(currentState);
	});
});
