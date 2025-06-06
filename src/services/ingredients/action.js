import { API_GET_INGREDIENTS } from '../../components/utils/endpoints';
import { request } from '../../components/utils/request';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
	return function (dispatch) {
		dispatch({
			type: GET_INGREDIENTS,
		});
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		};

		request(API_GET_INGREDIENTS, options)
			.then((res) => {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					ingredients: res.data,
				});
			})
			.catch((error) => {
				console.error('error:' + error);
				dispatch({
					type: GET_INGREDIENTS_FAILED,
				});
			});
	};
}
