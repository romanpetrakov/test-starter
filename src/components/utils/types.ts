import { RefObject } from 'react';

export type TUserData = {
	name: string;
	email: string;
	password: string;
};

export type TUser = {
	name: string;
	email: string;
};

export type TUserPassword = {
	password: string;
	email: string;
};

export type TUserWithToken = {
	password: string;
	token: string;
};

export type TModalProps = {
	closeModal: () => void;
	children: JSX.Element;
	header?: string;
};

export type TIngredient = {
	uniqueId?: string;
	_id: string;
	name: string;
	type: 'bun' | 'sauce' | 'main';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

export type TConstructorItem = {
	item?: TIngredient | null;
	type?: 'top' | 'bottom' | null;
	uuid?: string | null;
	indexInArray?: number | null;
	moveIngredient?: ((fromIndex: number, toIndex: number) => void) | null;
};

export type TDragItem = {
	uuid: string | null;
	indexInArray: number | null;
};

export type TDropCollectedProps = {
	handlerId: string | symbol | null;
};
export type TDragCollectedProps = {
	isDragging: boolean;
};
export type TDragCollectedPropsWithOpacity = TDragCollectedProps & {
	opacity: number;
};

export type TConstructorDropCollectedProps = {
	isOver: boolean;
};

export type TModalOverlayProps = {
	closeModal: () => void;
};

export type TModalHeaderProps = TModalOverlayProps & {
	header?: string;
};

export type TGroup = {
	id: number;
	name: string;
	title: string;
	value: string;
};

export type TGroupWithRef = TGroup & { ref: RefObject<HTMLDivElement> };

export type TCurrentTab = {
	currentTab: string;
	setCurrentTab: (tabName: string) => void;
};

export type TCuttentTabWithSetter = TCurrentTab & {
	setCurrentTab: (tabName: string) => void;
};

export type TOrder = {
	createdAt: string;
	ingredients: Array<string>;
	name: string;
	number: number;
	status: string;
	updatedAt: string;
	_id: string;
};

export type TOrders = {
	total: number;
	totalToday: number;
	success: string;
	orders: Array<TOrder>;
};

