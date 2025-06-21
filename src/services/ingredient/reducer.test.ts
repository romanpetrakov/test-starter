import { ingredientReducer, initialState } from './reducer';
import { SET_INGREDIENT, REMOVE_INGREDIENT } from './action';
import { TIngredient } from '../../components/utils/types';

describe('ingredient reducer', () => {
	const mockIngredient: TIngredient = {
		_id: '123',
		name: 'Test Ingredient',
		type: 'main',
		proteins: 10,
		fat: 5,
		carbohydrates: 15,
		calories: 100,
		price: 50,
		image: 'test-image.jpg',
		image_mobile: 'test-image-mobile.jpg',
		image_large: 'test-image-large.jpg',
		__v: 0,
	};

	it('should return the initial state', () => {
		expect(ingredientReducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle SET_INGREDIENT', () => {
		expect(
			ingredientReducer(initialState, {
				type: SET_INGREDIENT,
				ingredient: mockIngredient,
			})
		).toEqual({
			ingredient: mockIngredient,
			showModal: true,
		});
	});

	it('should handle REMOVE_INGREDIENT', () => {
		expect(
			ingredientReducer(
				{ ingredient: mockIngredient, showModal: true },
				{ type: REMOVE_INGREDIENT }
			)
		).toEqual(initialState);
	});

	it('should return current state for unknown action', () => {
		const currentState = {
			ingredient: mockIngredient,
			showModal: true,
		};

		expect(
			ingredientReducer(currentState, { type: 'UNKNOWN_ACTION' } as any)
		).toEqual(currentState);
	});
});
