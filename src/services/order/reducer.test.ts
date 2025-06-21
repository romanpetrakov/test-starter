import { orderReducer, initialState } from './reducer';
import {
	SET_ORDER,
	SET_ORDER_SUCCESS,
	SET_ORDER_FAILED,
	CLEAR_ORDER,
	GET_ORDER_INFO,
	GET_ORDER_INFO_SUCCESS,
	GET_ORDER_INFO_FAILED,
	CLEAR_ORDER_INFO,
} from './action';

describe('orderReducer', () => {
	const mockOrder = {
		_id: '123',
		ingredients: ['ing1', 'ing2'],
		status: 'done',
		name: 'Test order',
		number: 12345,
		createdAt: '2023-01-01',
		updatedAt: '2023-01-01',
	};

	it('should return the initial state', () => {
		expect(orderReducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle SET_ORDER', () => {
		expect(orderReducer(initialState, { type: SET_ORDER })).toEqual({
			...initialState,
			requestInProgress: true,
			sendOrderFailed: false,
			error: null,
		});
	});

	it('should handle SET_ORDER_SUCCESS', () => {
		expect(
			orderReducer(initialState, {
				type: SET_ORDER_SUCCESS,
				data: { order: mockOrder, success: true, name: 'name' },
			})
		).toEqual({
			...initialState,
			order: mockOrder,
			requestInProgress: false,
			sendOrderFailed: false,
			error: null,
		});
	});

	it('should handle SET_ORDER_FAILED', () => {
		const error = 'Failed to create order';

		expect(
			orderReducer(initialState, { type: SET_ORDER_FAILED, error: error })
		).toEqual({
			...initialState,
			requestInProgress: false,
			sendOrderFailed: true,
			error,
		});
	});

	it('should handle CLEAR_ORDER', () => {
		const stateWithOrder = {
			...initialState,
			order: mockOrder,
		};
		expect(orderReducer(stateWithOrder, { type: CLEAR_ORDER })).toEqual({
			...stateWithOrder,
			order: null,
		});
	});

	it('should handle GET_ORDER_INFO', () => {
		expect(orderReducer(initialState, { type: GET_ORDER_INFO })).toEqual({
			...initialState,
			error: null,
			getOrderFailed: false,
			requestInProgress: true,
		});
	});

	it('should handle GET_ORDER_INFO_SUCCESS', () => {
		expect(
			orderReducer(initialState, {
				type: GET_ORDER_INFO_SUCCESS,
				data: mockOrder,
			})
		).toEqual({
			...initialState,
			orderInfo: mockOrder,
			requestInProgress: false,
			getOrderFailed: false,
			error: null,
		});
	});

	it('should handle GET_ORDER_INFO_FAILED', () => {
		const error = 'Failed to get order info';

		expect(
			orderReducer(initialState, { type: GET_ORDER_INFO_FAILED, error: error })
		).toEqual({
			...initialState,
			requestInProgress: false,
			getOrderFailed: true,
			error: error,
		});
	});

	it('should handle CLEAR_ORDER_INFO', () => {
		const stateWithOrderInfo = {
			...initialState,
			orderInfo: mockOrder,
		};

		expect(
			orderReducer(stateWithOrderInfo, { type: CLEAR_ORDER_INFO })
		).toEqual({
			...stateWithOrderInfo,
			orderInfo: null,
		});
	});

	it('should return current state for unknown action', () => {
		const currentState = {
			...initialState,
			order: mockOrder, //{ number: 12345 },
		};

		expect(
			orderReducer(currentState, { type: 'UNKNOWN_ACTION' } as any)
		).toEqual(currentState);
	});
});
