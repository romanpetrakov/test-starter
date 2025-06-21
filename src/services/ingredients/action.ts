import { API_GET_INGREDIENTS } from '../../components/utils/endpoints';
import { request } from '../../components/utils/request';
import { TIngredient } from '../../components/utils/types';
import { AppDispatch } from '../../hooks/hooks';

export const GET_INGREDIENTS = 'GET_INGREDIENTS' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' as const;

interface IIngredientsResponse {
	success: boolean;
	data: TIngredient[];
}

export interface IGetIngredientAction {
	readonly type: typeof GET_INGREDIENTS;
}

interface IGetIngredientSuccessAction {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly ingredients: TIngredient[];
}

interface IGetIngredientFailedAction {
	readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
	| IGetIngredientAction
	| IGetIngredientSuccessAction
	| IGetIngredientFailedAction;

export function getIngredients() {
	return function (dispatch: AppDispatch) {
		dispatch<IGetIngredientAction>({
			type: GET_INGREDIENTS,
		});
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		};

		request<IIngredientsResponse>(API_GET_INGREDIENTS, options)
			.then((res) => {
				if (res.success) {
					dispatch<IGetIngredientSuccessAction>({
						type: GET_INGREDIENTS_SUCCESS,
						ingredients: res.data,
					});
				} else {
					throw new Error('Failed to fetch ingredients');
				}
			})
			.catch(() => {
				dispatch<IGetIngredientFailedAction>({
					type: GET_INGREDIENTS_FAILED,
				});
			});
	};
}
