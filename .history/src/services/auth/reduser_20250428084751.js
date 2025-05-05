
import {
	LOGIN,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	LOGOUT,
	LOGOUT_FAILED,
	LOGOUT_SUCCESS,
	REGISTER,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	REFRESH,
	REFRESH_SUCCESS,
	REFRESH_FAILED,
	FORGOT,
	FORGOT_SUCCESS,
	FORGOT_FAILED,
	RESET,
	RESET_SUCCESS,
	RESET_FAILED,
	GET_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILED,

} from './action';

const initialState = {
	user: null,
	isLoading: false,
	isLoadedLogin: false,
	isLoadedLogout: false,
	isLoadedForgot: false,
	isLoadedReset: false,
	isLoadedRegister: false,
	isLoadedUser: false,
	loginError: null,
	logoutError: null,
	forgotError: null,
	resetError: null,
	registerError: null,
	getUserError: null
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN: {
			return {
				isLoading: true,
				isLoadedLogin: false,
				loginError: null
			};
		}
		case LOGIN_SUCCESS: {
			return {
				user: { ...state.user, ...action.user },
				isLoading: false,
				isLoadedLogin: true
			};
		}

		case LOGIN_FAILED: {
			return {
				...state,
				isLoading: false,
				isLoadedLogin: false,
				loginError: action.error
			};
		}

		case LOGOUT: {
			return {
				...state,
				isLoading: true,
				isLoadedLogout: false,
				logoutError: null
			};
		}
		case LOGOUT_SUCCESS: {
			return {
				...state,
				user: null,
				isLoading: false,
				isLoadedLogout: true,
			};
		}
		case LOGOUT_FAILED: {
			return {
				...state,
				isLoading: false,
				isLoadedLogout: false,
				logoutError: action.error
			};
		}

		// case SET_AUTH_FLAG: {
		// 	return {
		// 		...state,
		// 		isAuthChecked: action.payload,
		// 	};
		// }
		case FORGOT: {
			return {
				...state,
				isLoading: true,
				isLoadedForgot: false,
				forgotError: null
			};
		}
		case FORGOT_SUCCESS: {
			return {
				...state,
				isLoading: false,
				isLoadedForgot: true,
			};
		}
		case FORGOT_FAILED: {
			return {
				...state,
				isLoading: false,
				isLoadedForgot: false,
				forgotError: action.error
			};
		}

		case RESET: {
			return {
				...state,
				isLoading: true,
				isLoadedReset: false,
				resetError: false
			};
		}
		case RESET_SUCCESS: {
			return {
				...state,
				isLoading: false,
				isLoadedReset: true,
			};
		}
		case RESET_FAILED: {
			return {
				...state,
				isLoading: false,
				isLoadedReset: false,
				resetError: action.error
			};
		}

		case REGISTER: {
			return {
				...state,
				isLoading: false,
				isLoadedRegister: false,
				registerError: null
			};
		}
		case REGISTER_SUCCESS: {
			return {
				...state,
				isLoading: false,
				isLoadedRegister: true,
				user: { ...state.user, ...action.user },
			};
		}
		case REGISTER_FAILED: {
			return {
				...state,
				isLoading: false,
				isLoadedRegister: false,
				registerError: action.registerError
			};
		}
		case GET_USER: {
			return {
				...state,
				isLoading: false,
				isLoadedUser: false,
				getUserError: null
			};
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				isLoading: false,
				isLoadedUser: true,
				user: action.user,
			};
		}
		case GET_USER_FAILED: {
			return {
				...state,
				isLoading: false,
				isLoadedUser: false,
				getUserError:  action.error
			};
		}
		case SET_USER: {
			return {
				...state,
				isLoading: false,
				isLoadedUser: false,
				setUserError: null
			};
		}
		case SET_USER_SUCCESS: {
			return {
				...state,
				isLoading: false,
				isLoadedUser: true,
				user: action.user,
			};
		}
		case SET_USER_FAILED: {
			return {
				...state,
				isLoading: false,
				isLoadedUser: false,
				setUserError:  action.error
			};
		}

		default: {
			return state;
		}
	}
};