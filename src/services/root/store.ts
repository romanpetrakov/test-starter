import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import { socketMiddleware, wsActions } from '../middleware/socketMiddleware';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(socketMiddleware(wsActions)),
	devTools: process.env.NODE_ENV !== 'production',
});
