import { rootReducer } from './reducer';
import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import { thunk } from 'redux-thunk';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (options: {
			trace?: boolean;
			traceLimit?: number;
		}) => typeof compose;
	}
}

const composeEnhancers: typeof compose =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({
		trace: true,
		traceLimit: 25,
	}) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
