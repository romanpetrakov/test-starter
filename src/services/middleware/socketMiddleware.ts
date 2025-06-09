// socketMiddleware.ts
import type { Middleware, MiddlewareAPI, UnknownAction } from 'redux';
import { AppDispatch, RootState } from '../../hooks/hooks';
import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_START_FOR_USER,
	WS_CONNECTION_SUCCESS,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE,
} from '../../services/websocket/actions';
import { getFromStorage } from '../../components/utils/storage';
import { TOrder } from '../../components/utils/types';

export type TWsActions = {
	wsInit: typeof WS_CONNECTION_START;
	wsSendMessage: typeof WS_SEND_MESSAGE;
	wsUserInit: typeof WS_CONNECTION_START_FOR_USER;
	onOpen: typeof WS_CONNECTION_SUCCESS;
	onClose: typeof WS_CONNECTION_CLOSED;
	onError: typeof WS_CONNECTION_ERROR;
	onMessage: typeof WS_GET_MESSAGE;
};

export const wsActions: TWsActions = {
	wsInit: WS_CONNECTION_START,
	wsUserInit: WS_CONNECTION_START_FOR_USER,
	wsSendMessage: WS_SEND_MESSAGE,
	onOpen: WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError: WS_CONNECTION_ERROR,
	onMessage: WS_GET_MESSAGE,
};

const baseUrl = 'wss://norma.nomoreparties.space';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		let reconnectTimer = 0;
		let lastData: {
			total: number;
			totalToday: number;
			success?: boolean;
			orders: TOrder[];
		} | null = null;
		let isConnected = false;
		let connectionType:
			| typeof WS_CONNECTION_START
			| typeof WS_CONNECTION_START_FOR_USER
			| null = null;

		return (next) => (action: UnknownAction) => {
			const { dispatch } = store;
			const { type, payload } = action;
			const {
				wsInit,
				wsUserInit,
				wsSendMessage,
				onOpen,
				onClose,
				onError,
				onMessage,
			} = wsActions;
			if (type === wsInit || type === wsUserInit) {
				connectionType = type;

				const token = getFromStorage('accessToken', '')?.replace('Bearer ', '');
				const wsUrl =
					type === wsUserInit
						? `${baseUrl}/orders?token=${token}`
						: `${baseUrl}/orders/all`;

				if (isConnected && socket) {
					socket.close();
				}
				socket = new WebSocket(wsUrl);
				isConnected = true;
				console.log('WebSocket connecting to:', wsUrl);
			}
			if (socket) {
				socket.onopen = () => {
					dispatch({ type: onOpen, payload: { isConnected: true } });
				};
				socket.onerror = () => {
					dispatch({ type: onError, payload: { error: 'WebSocket error' } });
				};

				socket.onmessage = (event) => {
					try {
						const data = JSON.parse(event.data);

						if (data && JSON.stringify(data) !== JSON.stringify(lastData)) {
							console.log('New WS data received:', data);
							dispatch({
								type: onMessage,
								payload: {
									orders: data.orders,
									total: data.total,
									totalToday: data.totalToday,
								},
							});
							lastData = data; // Обновляем последние данные
						}
					} catch (err) {
						console.error('Error parsing WebSocket message:', err, event.data);
					}
				};
				socket.onclose = (event) => {
					if (isConnected) {
						// Проверяем флаг
						dispatch({
							type: onClose,
							payload: {
								code: event.code,
								reason: event.reason,
								wasClean: event.wasClean,
							},
						});

						isConnected = false; // Сбрасываем флаг
						reconnectTimer = window.setTimeout(() => {
							if (connectionType) {
								dispatch({ type: connectionType, payload });
							}
						}, 3000);
					}
				};

				if (type === wsSendMessage && socket.readyState === WebSocket.OPEN) {
					socket.send(JSON.stringify(action.payload));
				}
			}
			if (type === onClose && socket) {
				clearTimeout(reconnectTimer);
				isConnected = false;
				socket.close();
				socket = null;
			}
			next(action);
		};
	}) as Middleware;
};
