import {
	API_LOGIN,
	API_LOGOUT,
	API_PASSWORD_RESET,
	API_PASSWORD_RESET_CONFIRM,
	API_REGISTER,
	API_USER_INFO,
} from '../../components/utils/endpoints';
import { request, requestWithAuth } from '../../components/utils/request';
import {
	getFromStorage,
	removeFromStorage,
	setToStorage,
} from '../../components/utils/storage';
import { TUser, TUserPassword } from '../../components/utils/types';
import { AppDispatch } from '../../hooks/hooks';

export const LOGIN = 'LOGIN' as const;
export const LOGIN_FAILED = 'LOGIN_FAILED' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGOUT = 'LOGOUT' as const;
export const LOGOUT_FAILED = 'LOGOUT_FAILED' as const;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
export const REGISTER = 'REGISTER_USER' as const;
export const REGISTER_SUCCESS = 'REGISTER_USER_SUCCESS' as const;
export const REGISTER_FAILED = 'REGISTER_USER_FAILED' as const;
export const REFRESH = 'REFRESH' as const;
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS' as const;
export const REFRESH_FAILED = 'REFRESH_FAILED' as const;
export const FORGOT = 'FORGOT_PASSWORD' as const;
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS' as const;
export const FORGOT_FAILED = 'FORGOT_FAILED' as const;
export const RESET = 'RESET' as const;
export const RESET_SUCCESS = 'RESET_SUCCESS' as const;
export const RESET_FAILED = 'RESET_FAILED' as const;
export const GET_USER = 'GET_USER' as const;
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS' as const;
export const GET_USER_FAILED = 'GET_USER_FAILED' as const;
export const SET_USER = 'SET_USER' as const;
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS' as const;
export const SET_USER_FAILED = 'SET_USER_FAILED' as const;

export interface IAuthResponse {
	success: boolean;
	user: TUser;
	accessToken: string;
	refreshToken: string;
}

export interface IPasswordResetResponse {
	success: boolean;
	message: string;
}

export interface IUserUpdateRequest {
	email: string;
	name: string;
	password?: string;
}

export interface ILoginRegisterRequest {
	email: string;
	password: string;
	name?: string; // Опционально для регистрации
}

export interface IPasswordResetRequest {
	email: string;
}

export interface IPasswordResetConfirmRequest {
	password: string;
	token: string;
}

// Action interfaces
interface ILoginAction {
	readonly type: typeof LOGIN;
}
interface ILoginSuccessAction {
	readonly type: typeof LOGIN_SUCCESS;
	readonly user: TUser;
}
interface ILoginFailedAction {
	readonly type: typeof LOGIN_FAILED;
	readonly error: string;
}
interface ILogoutAction {
	readonly type: typeof LOGOUT;
}
interface ILogoutSuccessAction {
	readonly type: typeof LOGOUT_SUCCESS;
}
interface ILogoutFailedAction {
	readonly type: typeof LOGOUT_FAILED;
	readonly logoutError: string;
}
interface IRegisterAction {
	readonly type: typeof REGISTER;
}
interface IRegisterSuccessAction {
	readonly type: typeof REGISTER_SUCCESS;
	readonly user: TUser;
}

interface IRegisterFailedAction {
	readonly type: typeof REGISTER_FAILED;
	readonly registerError: string;
}

interface IForgotAction {
	readonly type: typeof FORGOT;
}

interface IForgotSuccessAction {
	readonly type: typeof FORGOT_SUCCESS;
}

interface IForgotFailedAction {
	readonly type: typeof FORGOT_FAILED;
	readonly forgotError: string;
}

interface IResetAction {
	readonly type: typeof RESET;
}

interface IResetSuccessAction {
	readonly type: typeof RESET_SUCCESS;
}

interface IResetFailedAction {
	readonly type: typeof RESET_FAILED;
	readonly resetError: string;
}

interface IGetUserAction {
	readonly type: typeof GET_USER;
}

interface IGetUserSuccessAction {
	readonly type: typeof GET_USER_SUCCESS;
	readonly user: TUser;
}

interface IGetUserFailedAction {
	readonly type: typeof GET_USER_FAILED;
	readonly error: string;
}

interface ISetUserAction {
	readonly type: typeof SET_USER;
}

interface ISetUserSuccessAction {
	readonly type: typeof SET_USER_SUCCESS;
	readonly user: TUser;
}

interface ISetUserFailedAction {
	readonly type: typeof SET_USER_FAILED;
	readonly error: string;
}

export type TAuthActions =
	| ILoginAction
	| ILoginSuccessAction
	| ILoginFailedAction
	| ILogoutAction
	| ILogoutSuccessAction
	| ILogoutFailedAction
	| IRegisterAction
	| IRegisterSuccessAction
	| IRegisterFailedAction
	| IForgotAction
	| IForgotSuccessAction
	| IForgotFailedAction
	| IResetAction
	| IResetSuccessAction
	| IResetFailedAction
	| IGetUserAction
	| IGetUserSuccessAction
	| IGetUserFailedAction
	| ISetUserAction
	| ISetUserSuccessAction
	| ISetUserFailedAction;

export function loginRequest(form: TUserPassword) {
	return function (dispatch: AppDispatch) {
		dispatch<ILoginAction>({
			type: LOGIN,
		});

		const options = {
			method: 'POST',
			body: JSON.stringify({
				email: form.email,
				password: form.password,
			}),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		};

		request<IAuthResponse>(API_LOGIN, options)
			.then((res) => {
				dispatch<ILoginSuccessAction>({
					type: LOGIN_SUCCESS,
					user: res.user,
				});
				setToStorage('refreshToken', res.refreshToken);
				setToStorage('accessToken', res.accessToken);
			})
			.catch((error: Error) => {
				console.log(error);
				dispatch<ILoginFailedAction>({
					type: LOGIN_FAILED,
					error: error.message,
				});
				throw error;
			});
	};
}

export function logoutRequest() {
	return function (dispatch: AppDispatch) {
		dispatch<ILogoutAction>({
			type: LOGOUT,
		});
		requestWithAuth<{ success: boolean }>(API_LOGOUT, {
			method: 'POST',
			body: JSON.stringify({ token: getFromStorage('refreshToken') }),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then(() => {
				dispatch<ILogoutSuccessAction>({
					type: LOGOUT_SUCCESS,
				});
				removeFromStorage('refreshToken');
				removeFromStorage('accessToken');
			})
			.catch((error: Error) => {
				dispatch<ILogoutFailedAction>({
					type: LOGOUT_FAILED,
					logoutError: error.message,
				});
			});
	};
}

export function registerRequest(form: ILoginRegisterRequest) {
	return function (dispatch: AppDispatch) {
		dispatch<IRegisterAction>({
			type: REGISTER,
		});

		request<IAuthResponse>(API_REGISTER, {
			method: 'POST',
			body: JSON.stringify({
				email: form.email,
				password: form.password,
				name: form.name,
			}),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				setToStorage('refreshToken', res.refreshToken);
				setToStorage('accessToken', res.accessToken);
				dispatch<IRegisterSuccessAction>({
					type: REGISTER_SUCCESS,
					user: res.user,
				});
			})
			.catch((error: Error) => {
				dispatch<IRegisterFailedAction>({
					type: REGISTER_FAILED,
					registerError: error.message,
				});
			});
	};
}
export function forgotRequest(form: IPasswordResetRequest) {
	return function (dispatch: AppDispatch) {
		dispatch<IForgotAction>({
			type: FORGOT,
		});

		request<IPasswordResetResponse>(API_PASSWORD_RESET, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				email: form.email,
			}),
		})
			.then(() => {
				dispatch<IForgotSuccessAction>({
					type: FORGOT_SUCCESS,
				});
			})
			.catch((error: Error) => {
				// Явное указание типа Error
				console.error('error:' + error);
				dispatch<IForgotFailedAction>({
					type: FORGOT_FAILED,
					forgotError: error.message,
				});
			});
	};
}

export function resetPassword(form: IPasswordResetConfirmRequest) {
	return function (dispatch: AppDispatch) {
		dispatch<IResetAction>({
			type: RESET,
		});

		request<IPasswordResetResponse>(API_PASSWORD_RESET_CONFIRM, {
			method: 'POST',
			body: JSON.stringify({
				password: form.password,
				token: form.token,
			}),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch<IResetSuccessAction>({
					type: RESET_SUCCESS,
				});
				if (res.success) {
					localStorage.removeItem('forgotPage');
				}
			})
			.catch((error: Error) => {
				alert(error.message);
				dispatch<IResetFailedAction>({
					type: RESET_FAILED,
					resetError: error.message,
				});
			});
	};
}

export function updateUser(form: IUserUpdateRequest) {
	return function (dispatch: AppDispatch) {
		dispatch<ISetUserAction>({
			type: SET_USER,
		});

		requestWithAuth<IAuthResponse>(API_USER_INFO, {
			method: 'PATCH',
			body: JSON.stringify({
				email: form.email,
				name: form.name,
				password: form.password,
			}),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch<ISetUserSuccessAction>({
					type: SET_USER_SUCCESS,
					user: res.user,
				});
				alert('Данные успешно сохранены');
			})
			.catch((error: Error) => {
				dispatch<ISetUserFailedAction>({
					type: SET_USER_FAILED,
					error: error.message,
				});
			});
	};
}

export function getUser() {
	return function (dispatch: AppDispatch) {
		dispatch<IGetUserAction>({
			type: GET_USER,
		});

		requestWithAuth<IAuthResponse>(API_USER_INFO, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch<IGetUserSuccessAction>({
					type: GET_USER_SUCCESS,
					user: res.user,
				});
			})
			.catch((err) => {
				dispatch<IGetUserFailedAction>({
					type: GET_USER_FAILED,
					error: err,
				});
			});
	};
}
