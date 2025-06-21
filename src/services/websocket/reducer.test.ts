import { wsReducer, initialState } from './reducer';
import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
} from './actions';
import { TOrder, TOrders } from '../../components/utils/types';

describe('WebSocket Reducer', () => {
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
		expect(wsReducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle WS_CONNECTION_START', () => {
		expect(
			wsReducer(initialState, {
				type: WS_CONNECTION_START,
				payload: '/orders/all',
			})
		).toEqual({
			...initialState,
			wsConnected: false,
			feedLoading: true,
			feedSuccess: false,
			feedRequest: true,
		});
	});

	it('should handle WS_CONNECTION_SUCCESS', () => {
		expect(wsReducer(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual({
			...initialState,
			wsConnected: true,
		});
	});

	it('should handle WS_CONNECTION_ERROR', () => {
		const action = { type: WS_CONNECTION_ERROR };
		const expectedState = {
			...initialState,
			wsConnected: false,
		};
		expect(wsReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_CONNECTION_CLOSED', () => {
		const action = { type: WS_CONNECTION_CLOSED };
		const currentState = {
			...initialState,
			wsConnected: true,
			messages: [mockOrder as TOrder],
		};
		const expectedState = {
			...initialState,
			wsConnected: false,
			messages: [],
		};
		expect(wsReducer(currentState, action)).toEqual(expectedState);
	});

	it('should handle WS_GET_MESSAGE with new data', () => {
		const orders: TOrder[] = [mockOrder as TOrder];
		const payload: TOrders = {
			orders,
			total: 100,
			totalToday: 10,
			success: 'true',
		};
		const action = { type: WS_GET_MESSAGE, payload };
		const expectedState = {
			...initialState,
			messages: orders,
			total: 100,
			totalToday: 10,
		};
		expect(wsReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_GET_MESSAGE with same data', () => {
		const orders: TOrder[] = [mockOrder as TOrder];
		const payload: TOrders = {
			orders,
			total: 100,
			totalToday: 10,
			success: 'true',
		};
		const currentState = {
			...initialState,
			messages: orders,
			total: 100,
			totalToday: 10,
		};
		const action = { type: WS_GET_MESSAGE, payload };
		expect(wsReducer(currentState, action)).toBe(currentState);
	});
});
