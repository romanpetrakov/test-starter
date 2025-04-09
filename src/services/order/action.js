import { request } from '../../components/utils/request';

export const SET_ORDER = 'SET_ORDER';
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export function setOrder(productsIds) {
	return function (dispatch) {
		dispatch({
			type: SET_ORDER,
		});
		const path = 'api/orders';
		const options = {
			method: 'POST',
			body: productsIds,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		};
		request(path, options)
			.then((res) => {
				if (res && res.success) {
					dispatch({
						type: SET_ORDER_SUCCESS,
						data: res,
					});

					return res;
				}
				return Promise.reject('Ответ не success: ' + res);
			})
			.catch((error) => {
				console.error('error:' + error);
				dispatch({
					type: SET_ORDER_FAILED,
				});
			});
	};
}
