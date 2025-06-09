import { API_ORDERS } from '../../components/utils/endpoints';
import {
	request,
	requestWithAuth,
	TRequestOptions,
} from '../../components/utils/request';
import { TOrder } from '../../components/utils/types';
import { AppDispatch } from '../../hooks/hooks';
import { TOrderNumber } from './reducer';

export const SET_ORDER = 'SET_ORDER' as const;
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED' as const;
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS' as const;
export const CLEAR_ORDER = 'CLEAR_ORDER' as const;

export const GET_ORDER_INFO = 'GET_ORDER_INFO' as const;
export const GET_ORDER_INFO_FAILED = 'GET_ORDER_INFO_FAILED' as const;
export const GET_ORDER_INFO_SUCCESS = 'GET_ORDER_INFO_SUCCESS' as const;
export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO' as const;

export interface IOrderResponse {
	success: boolean;
	name: string;
	order: TOrderNumber;
}

export interface IOrderInfoResponse {
	success: boolean;
	orders: TOrder[];
}
interface ISetOrderAction {
	readonly type: typeof SET_ORDER;
}

interface ISetOrderSuccessAction {
	readonly type: typeof SET_ORDER_SUCCESS;
	readonly data: IOrderResponse;
}

interface ISetOrderFailedAction {
	readonly type: typeof SET_ORDER_FAILED;
	readonly error: string;
}

interface IClearOrderAction {
	readonly type: typeof CLEAR_ORDER;
}

interface IGetOrderInfoAction {
	readonly type: typeof GET_ORDER_INFO;
}

interface IGetOrderInfoSuccessAction {
	readonly type: typeof GET_ORDER_INFO_SUCCESS;
	readonly data: TOrder | null;
}

interface IGetOrderInfoFailedAction {
	readonly type: typeof GET_ORDER_INFO_FAILED;
	readonly error: string;
}

interface IClearOrderInfoAction {
	readonly type: typeof CLEAR_ORDER_INFO;
}

// Union type for all order actions
export type TOrderActions =
	| ISetOrderAction
	| ISetOrderSuccessAction
	| ISetOrderFailedAction
	| IClearOrderAction
	| IGetOrderInfoAction
	| IGetOrderInfoSuccessAction
	| IGetOrderInfoFailedAction
	| IClearOrderInfoAction;

export const setOrder = (productsIds: string[]) => {
	return function (dispatch: AppDispatch) {
		dispatch<ISetOrderAction>({ type: SET_ORDER });
		const options: TRequestOptions = {
			method: 'POST',
			body: JSON.stringify({ ingredients: productsIds }),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		};
		requestWithAuth<IOrderResponse>(API_ORDERS, options)
			.then((res) => {
				if (res?.success) {
					dispatch<ISetOrderSuccessAction>({
						type: SET_ORDER_SUCCESS,
						data: res,
					});
				} else {
					throw new Error('Order request failed');
				}
			})
			.catch((error: Error) => {
				console.error('Order error:', error);
				dispatch<ISetOrderFailedAction>({
					type: SET_ORDER_FAILED,
					error: error.message,
				});
			});
	};
};

export const clearOrder = (): IClearOrderAction => ({
	type: CLEAR_ORDER,
});

export const getOrderInfo = (orderId: string) => {
	return function (dispatch: AppDispatch) {
		dispatch<IGetOrderInfoAction>({ type: GET_ORDER_INFO });
		const options: TRequestOptions = {
			method: 'GET',
			//	body: JSON.stringify({ ingredients: orderId }),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		};
		request<IOrderInfoResponse>(API_ORDERS + '/' + orderId, options)
			.then((res) => {
				if (res?.success) {
					dispatch<IGetOrderInfoSuccessAction>({
						type: GET_ORDER_INFO_SUCCESS,
						data: res.orders ? res.orders[0] : null,
					});
				} else {
					throw new Error('Order request failed');
				}
			})
			.catch((error: Error) => {
				console.error('Order error:', error);
				dispatch<IGetOrderInfoFailedAction>({
					type: GET_ORDER_INFO_FAILED,
					error: error.message,
				});
			});
	};
};

export const clearOrderInfo = (): IClearOrderInfoAction => ({
	type: CLEAR_ORDER_INFO,
});
