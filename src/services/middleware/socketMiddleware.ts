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

interface WebSocketMessage {
  success?: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}
const baseUrl = 'wss://norma.nomoreparties.space';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let reconnectTimer = 0;
    let lastData: WebSocketMessage | null = null;
    let isConnected = false;
    let isConnecting = false; // Добавляем флаг подключения
    let connectionType: typeof WS_CONNECTION_START | typeof WS_CONNECTION_START_FOR_USER | null = null;

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
        // Если уже идет подключение, не создаем новое
        if (isConnecting || isConnected) return;

        connectionType = type;
        isConnecting = true; // Устанавливаем флаг подключения

        const token = getFromStorage('accessToken', '')?.replace('Bearer ', '');
        const wsUrl = type === wsUserInit
          ? `${baseUrl}/orders?token=${token}`
          : `${baseUrl}/orders/all`;

        // Закрываем предыдущее соединение, если оно есть
        if (socket) {
          socket.close();
        }

        try {
          socket = new WebSocket(wsUrl);
          console.log('WebSocket connecting to:', wsUrl);

          socket.onopen = () => {
            isConnecting = false;
            isConnected = true;
            dispatch({ type: onOpen, payload: { isConnected: true } });
          };

          socket.onerror = (error) => {
            isConnecting = false;
            console.error('WebSocket error:', error);
            dispatch({ type: onError, payload: { error: 'WebSocket error' } });
          };

          socket.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data) as Partial<WebSocketMessage>;

              if (data?.orders && data.total !== undefined && data.totalToday !== undefined) {
                const message: WebSocketMessage = {
                  orders: data.orders,
                  total: data.total,
                  totalToday: data.totalToday,
                  success: data.success,
                };

                if (JSON.stringify(message) !== JSON.stringify(lastData)) {
                  console.log('New WS data received:', message);
                  dispatch({
                    type: onMessage,
                    payload: {
                      orders: message.orders,
                      total: message.total,
                      totalToday: message.totalToday,
                    },
                  });
                  lastData = message;
                }
              } else {
                console.error('Invalid WebSocket message format:', data);
              }
            } catch (err) {
              console.error('Error parsing WebSocket message:', err, event.data);
            }
          };

          socket.onclose = (event) => {
            isConnecting = false;
            if (isConnected) {
              dispatch({
                type: onClose,
                payload: {
                  code: event.code,
                  reason: event.reason,
                  wasClean: event.wasClean,
                },
              });
              isConnected = false;

              // Пытаемся переподключиться только если соединение было установлено
              reconnectTimer = window.setTimeout(() => {
                if (connectionType) {
                  dispatch({ type: connectionType, payload });
                }
              }, 3000);
            }
          };

        } catch (error) {
          isConnecting = false;
          console.error('WebSocket creation error:', error);
          dispatch({ type: onError, payload: { error: 'WebSocket creation error' } });
        }
      }

      if (type === wsSendMessage && socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(action.payload));
      }

      if (type === onClose && socket) {
        clearTimeout(reconnectTimer);
        isConnecting = false;
        isConnected = false;
        socket.close();
        socket = null;
      }

      next(action);
    };
  }) as Middleware;
};