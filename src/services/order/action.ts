import { API_ORDERS } from '../../components/utils/endpoints';
import { request, TRequestOptions } from '../../components/utils/request';
import { AppDispatch } from '../../hooks/hooks';

export const SET_ORDER = 'SET_ORDER' as const;
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED' as const;
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS' as const;
export const CLEAR_ORDER = 'CLEAR_ORDER' as const;

interface IOrderResponse {
	success: boolean;
	name: string;
	order: {
		number: number;
	};
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
}

interface IClearOrderAction {
	readonly type: typeof CLEAR_ORDER;
}

// Union type for all order actions
export type TOrderActions =
	| ISetOrderAction
	| ISetOrderSuccessAction
	| ISetOrderFailedAction
	| IClearOrderAction;

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
		request<IOrderResponse>(API_ORDERS, options)
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
			.catch((error: unknown) => {
				console.error('Order error:', error);
				dispatch<ISetOrderFailedAction>({
					type: SET_ORDER_FAILED,
				});
			});
	};
};

export const clearOrder = (): IClearOrderAction => ({
	type: CLEAR_ORDER,
});
