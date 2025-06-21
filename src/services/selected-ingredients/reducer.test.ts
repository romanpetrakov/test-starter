import { selectedIngredientsReducer, initialState } from './reducer';
import { TIngredient } from '../../components/utils/types';
import {
	ADD_ITEM,
	REMOVE_ITEM,
	SET_BUN,
	REMOVE_BUN,
	CHANGE_ORDER,
} from './action';

describe('selectedIngredientsReducer', () => {
	const mockBun: TIngredient = {
		_id: 'bun1',
		name: 'Test Bun',
		type: 'bun',
		proteins: 0,
		fat: 0,
		carbohydrates: 0,
		calories: 0,
		price: 100,
		image: '',
		image_mobile: '',
		image_large: '',
		__v: 0,
		uniqueId: 'bun1-unique',
	};

	const mockIngredient1: TIngredient = {
		_id: 'ing1',
		name: 'Ingredient 1',
		type: 'sauce',
		proteins: 0,
		fat: 0,
		carbohydrates: 0,
		calories: 0,
		price: 50,
		image: '',
		image_mobile: '',
		image_large: '',
		__v: 0,
		uniqueId: 'ing1-unique',
	};

	const mockIngredient2: TIngredient = {
		_id: 'ing2',
		name: 'Ingredient 2',
		type: 'main',
		proteins: 0,
		fat: 0,
		carbohydrates: 0,
		calories: 0,
		price: 75,
		image: '',
		image_mobile: '',
		image_large: '',
		__v: 0,
		uniqueId: 'ing2-unique',
	};

	it('should return the initial state', () => {
		expect(selectedIngredientsReducer(undefined, {} as any)).toEqual(
			initialState
		);
	});

	it('should handle ADD_ITEM', () => {
		expect(
			selectedIngredientsReducer(initialState, {
				type: ADD_ITEM,
				ingredient: mockIngredient1,
			})
		).toEqual({
			...initialState,
			ingredients: [mockIngredient1],
		});
	});

	it('should handle REMOVE_ITEM', () => {
		expect(
			selectedIngredientsReducer(
				{ ...initialState, ingredients: [mockIngredient1, mockIngredient2] },
				{ type: REMOVE_ITEM, ingredient: mockIngredient1 }
			)
		).toEqual({
			...initialState,
			ingredients: [mockIngredient2],
		});
	});

	it('should handle SET_BUN', () => {
		expect(
			selectedIngredientsReducer(initialState, { type: SET_BUN, bun: mockBun })
		).toEqual({
			...initialState,
			bun: mockBun,
		});
	});

	it('should handle REMOVE_BUN', () => {
		expect(
			selectedIngredientsReducer(
				{ ...initialState, bun: mockBun },
				{ type: REMOVE_BUN }
			)
		).toEqual(initialState);
	});

	it('should handle CHANGE_ORDER', () => {
		const newOrder = [mockIngredient2, mockIngredient1];

		expect(
			selectedIngredientsReducer(
				{ ...initialState, ingredients: [mockIngredient1, mockIngredient2] },
				{ type: CHANGE_ORDER, ingredients: newOrder }
			)
		).toEqual({
			...initialState,
			ingredients: newOrder,
		});
	});

	it('should ignore unknown action types', () => {
		const stateWithItems = {
			...initialState,
			ingredients: [mockIngredient1],
		};

		expect(
			selectedIngredientsReducer(stateWithItems, {
				type: 'UNKNOWN_ACTION',
			} as any)
		).toEqual(stateWithItems);
	});
});
