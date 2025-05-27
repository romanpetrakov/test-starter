import {
	SET_ORDER,
	SET_ORDER_FAILED,
	SET_ORDER_SUCCESS,
	CLEAR_ORDER,
	TOrderActions,
} from './action';

const initialState: TOrderState = {
	order: null,
	requestInProgress: false,
	sendOrderFailed: false,
};

type TOrder = {
	number: number;
};

type TOrderState = {
	order: TOrder | null;
	requestInProgress: boolean;
	sendOrderFailed: boolean;
};

export const orderReducer = (
	state: TOrderState = initialState,
	action: TOrderActions
): TOrderState => {
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
