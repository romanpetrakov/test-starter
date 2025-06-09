import { TIngredient } from '../../components/utils/types';

export const ADD_ITEM = 'ADD_ITEM' as const;
export const REMOVE_ITEM = 'REMOVE_ITEM' as const;
export const SET_BUN = 'SET_BUN' as const;
export const REMOVE_BUN = 'REMOVE_BUN' as const;
export const CHANGE_ORDER = 'CHANGE_ORDER' as const;

interface IAddItemAction {
	readonly type: typeof ADD_ITEM;
	readonly ingredient: TIngredient;
}
interface IRemoveItemAction {
	readonly type: typeof REMOVE_ITEM;
	readonly ingredient: TIngredient;
}
interface ISetBunAction {
	readonly type: typeof SET_BUN;
	readonly bun: TIngredient;
}

interface IRemoveBunAction {
	readonly type: typeof REMOVE_BUN;
}

interface IChangeOrderAction {
	readonly type: typeof CHANGE_ORDER;
	readonly ingredients: TIngredient[];
}

export type TSelectIngredientActions =
	| IAddItemAction
	| IRemoveItemAction
	| ISetBunAction
	| IRemoveBunAction
	| IChangeOrderAction;

export const addItem = (ingredient: TIngredient): IAddItemAction => ({
	type: ADD_ITEM,
	ingredient,
});

export const removeItem = (ingredient: TIngredient): IRemoveItemAction => ({
	type: REMOVE_ITEM,
	ingredient,
});

export const setBun = (bun: TIngredient): ISetBunAction => ({
	type: SET_BUN,
	bun,
});

export const removeBun = (): IRemoveBunAction => ({
	type: REMOVE_BUN,
});

export const changeOrder = (
	ingredients: TIngredient[]
): IChangeOrderAction => ({
	type: CHANGE_ORDER,
	ingredients,
});
