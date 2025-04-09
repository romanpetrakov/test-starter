import {
	SET_ORDER,
	SET_ORDER_FAILED,
	SET_ORDER_SUCCESS,
	CLEAR_ORDER,
} from './action';

const initialState = {
	order: null,
	requestInProgress: false,
	sendOrderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ORDER: {
			return {
				...state,
				requestInProgress: true,
			};
		}
		case SET_ORDER_SUCCESS: {
			return {
				...state,
				order: action.data.order,
				requestInProgress: false,
				sendOrderFailed: false,
			};
		}
		case SET_ORDER_FAILED: {
			return {
				...state,
				requestInProgress: false,
				sendOrderFailed: true,
			};
		}
		case CLEAR_ORDER: {
			return {
				...state,
				order: null,
			};
		}
		default: {
			return state;
		}
	}
};
