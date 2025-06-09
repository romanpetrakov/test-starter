import { TOrders } from '../../components/utils/types';

export const WS_CONNECTION_START = 'WS_CONNECTION_START' as const;
export const WS_CONNECTION_START_FOR_USER =
	'WS_CONNECTION_START_FOR_USER' as const;
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS' as const;
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR' as const;
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED' as const;
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE' as const;
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE' as const;

export interface IWsConnectionStartAction {
	readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionStartForUserAction {
	readonly type: typeof WS_CONNECTION_START_FOR_USER;
}
export interface IWsConnectionSuccessAction {
	readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionClosedAction {
	readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionErrorAction {
	readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsGetMessageAction {
	readonly type: typeof WS_GET_MESSAGE;
	readonly payload: TOrders;
}

export type TWsFeedAction =
	| IWsConnectionSuccessAction
	| IWsConnectionStartAction
	| IWsConnectionClosedAction
	| IWsConnectionErrorAction
	| IWsGetMessageAction
	| IWsConnectionStartForUserAction;
//   | IWsGetUserOrderAction;

export const wsConnectionStartForUser = (): TWsFeedAction => {
	return {
		type: WS_CONNECTION_START_FOR_USER,
	};
};
export const wsConnectionStart = (): TWsFeedAction => {
	return {
		type: WS_CONNECTION_START,
	};
};
export const wsConnectionSuccess = (): TWsFeedAction => {
	return {
		type: WS_CONNECTION_SUCCESS,
	};
};

export const wsConnectionError = (): TWsFeedAction => {
	return {
		type: WS_CONNECTION_ERROR,
	};
};

export const wsConnectionClosed = (): TWsFeedAction => {
	return {
		type: WS_CONNECTION_CLOSED,
	};
};
