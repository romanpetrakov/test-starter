import { TIngredient } from '../../components/utils/types';

export const SET_INGREDIENT = 'SET_INGREDIENT' as const;
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT' as const;

export interface ISetIngredientAction {
	readonly type: typeof SET_INGREDIENT;
	readonly ingredient: TIngredient;
}
export interface IRemoveIngredientAction {
	readonly type: typeof REMOVE_INGREDIENT;
}

export type TIngredientActions = ISetIngredientAction | IRemoveIngredientAction;

export const setIngredient = (
	ingredient: TIngredient
): ISetIngredientAction => ({
	type: SET_INGREDIENT,
	ingredient: ingredient,
});

export const removeIngredient = (): IRemoveIngredientAction => ({
	type: REMOVE_INGREDIENT,
});
