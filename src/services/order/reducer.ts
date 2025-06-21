import { TOrder } from '../../components/utils/types';
import {
	SET_ORDER,
	SET_ORDER_FAILED,
	SET_ORDER_SUCCESS,
	CLEAR_ORDER,
	TOrderActions,
	GET_ORDER_INFO,
	GET_ORDER_INFO_SUCCESS,
	GET_ORDER_INFO_FAILED,
	CLEAR_ORDER_INFO,
} from './action';

export const initialState: TOrderState = {
	order: null,
	orderInfo: null,
	requestInProgress: false,
	sendOrderFailed: false,
	getOrderFailed: false,
	error: null,
};

export type TOrderNumber = {
	number: number;
};

type TOrderState = {
	order: TOrderNumber | null;
	orderInfo: TOrder | null;
	requestInProgress: boolean;
	sendOrderFailed: boolean;
	getOrderFailed: boolean;
	error: string | null;
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
				sendOrderFailed: false,
				error: null,
			};
		}
		case SET_ORDER_SUCCESS: {
			return {
				...state,
				order: action.data.order,
				requestInProgress: false,
				sendOrderFailed: false,
				error: null,
			};
		}
		case SET_ORDER_FAILED: {
			return {
				...state,
				requestInProgress: false,
				sendOrderFailed: true,
				error: action.error,
			};
		}
		case CLEAR_ORDER: {
			return {
				...state,
				order: null,
			};
		}
		case GET_ORDER_INFO: {
			return {
				...state,
				error: null,
				getOrderFailed: false,
				requestInProgress: true,
			};
		}
		case GET_ORDER_INFO_SUCCESS: {
			return {
				...state,
				orderInfo: action.data,
				requestInProgress: false,
				getOrderFailed: false,
				error: null,
			};
		}
		case GET_ORDER_INFO_FAILED: {
			return {
				...state,
				requestInProgress: false,
				getOrderFailed: true,
				error: action.error,
			};
		}
		case CLEAR_ORDER_INFO: {
			return {
				...state,
				orderInfo: null,
			};
		}

		default: {
			return state;
		}
	}
};
