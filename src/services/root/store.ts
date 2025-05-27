import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';

export const store = configureStore({
	reducer: rootReducer, // Ваш комбинированный редюсер
	//   middleware: (getDefaultMiddleware) =>
	//     getDefaultMiddleware().concat(
	//       socketMiddleware(feedWsActions, baseWsURL), // Подключаем middleware для feed
	//       socketMiddleware(ordersWsActions, baseWsURL) // Подключаем middleware для orders
	//     ),
	devTools: process.env.NODE_ENV !== 'production', // Включаем devTools в режиме разработки
});
