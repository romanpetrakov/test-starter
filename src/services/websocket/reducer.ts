import { TOrder } from '../../components/utils/types';
import {
	TWsFeedAction,
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_GET_MESSAGE,
} from './actions';

type TWSState = {
	wsConnected: boolean | undefined;
	messages: TOrder[];
	total: number | undefined;
	totalToday: number | undefined;
	feedLoading?: boolean;
	feedSuccess?: boolean;
	feedRequest?: boolean;
};

const initialState: TWSState = {
	wsConnected: undefined,
	total: undefined,
	totalToday: undefined,
	messages: [],
};

export const wsReducer = (
	state = initialState,
	action: TWsFeedAction
): TWSState => {
	switch (action.type) {
		case WS_CONNECTION_START:
			return {
				...state,
				wsConnected: false,
				feedLoading: true,
				feedSuccess: false,
				feedRequest: true,
			};
		case WS_CONNECTION_SUCCESS:
			return {
				...state,
				wsConnected: true,
			};
		case WS_CONNECTION_ERROR:
			return {
				...state,
				wsConnected: false,
			};
		case WS_CONNECTION_CLOSED:
			return {
				...state,
				wsConnected: false,
				messages: [],
			};
		case WS_GET_MESSAGE:
			if (
				state.messages === action.payload?.orders &&
				state.total === action.payload?.total &&
				state.totalToday === action.payload?.totalToday
			) {
				return state;
			}
			return {
				...state,
				total: action.payload.total,
				totalToday: action.payload?.totalToday,
				messages: [...(action.payload?.orders || [])],
			};
		default:
			return state;
	}
};
