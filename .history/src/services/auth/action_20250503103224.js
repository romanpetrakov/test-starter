import { API_LOGIN, API_LOGOUT, API_PASSWORD_RESET, API_REGISTER, API_USER_INFO } from '../../components/utils/endpoints';
import { request, requestWithAuth } from '../../components/utils/request';
import { getFromStorage, removeFromStorage, setToStorage } from '../../components/utils/storage';

export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER = 'REGISTER_USER';
export const REGISTER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_USER_FAILED';
export const REFRESH = 'REFRESH';
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS';
export const REFRESH_FAILED = 'REFRESH_FAILED';
export const FORGOT = 'FORGOT_PASSWORD';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_FAILED = 'FORGOT_FAILED';
export const RESET = 'RESET';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILED = 'RESET_FAILED';
export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const SET_USER = 'SET_USER';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';



export function loginRequest(form) {
	return function (dispatch) {
		dispatch({
			type: LOGIN,
		});
		const requestData = {
			email: form.email,
			password: form.password,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(requestData),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		};

		request(API_LOGIN, options)
			.then((res) => {
				dispatch({
					type: LOGIN_SUCCESS,
					user: res.user,
				});
				setToStorage('refreshToken', res.refreshToken);
				setToStorage('accessToken', res.accessToken);
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: LOGIN_FAILED,
					error: error
				});
				 throw error;
			});
	};

}

export function logoutRequest() {
	return function (dispatch) {
		dispatch({
			type: LOGOUT,
		});
		requestWithAuth(API_LOGOUT, {
			method: 'POST',
			body: JSON.stringify({ token: getFromStorage('refreshToken') }),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then(() => {
				dispatch({
					type: LOGOUT_SUCCESS,
				});
				removeFromStorage('refreshToken');
				removeFromStorage('accessToken');
			})
			.catch((err) => {
				dispatch({
					type: LOGOUT_FAILED,
					logoutError: err,
				});
			});
	};
}

export function registerRequest(form) {
	return function (dispatch) {
		dispatch({
			type: REGISTER,
		});
		const requestData = {
			email: form.email,
			password: form.password,
			name: form.name
		};

		request(API_REGISTER, {
			method: 'POST',
			body: JSON.stringify(requestData),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
		.then((res) => {
			setToStorage('refreshToken', res.refreshToken);
			setToStorage('accessToken', res.accessToken);
			dispatch({
				type: REGISTER_SUCCESS,
				user: res.user,
			});
		})
		.catch((err) => {
			dispatch({
				type: REGISTER_FAILED,
				registerError: err.message,
			});
		});
	};
}
export function forgotRequest(form) {
	return async function (dispatch) {
		dispatch({
			type: FORGOT,
		});
		const requestData = {
			email: form.email
		};

		try {
			const res = await request(API_PASSWORD_RESET, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(requestData),
			});

			dispatch({
				type: FORGOT_SUCCESS,
			});
		} catch (error) {
			console.error('error:' + error);
			dispatch({
				type: FORGOT_FAILED,
			});
		}
	};
};

export function resetPassword(form) {
	return function (dispatch) {
		dispatch({
			type: RESET,
		});

		const requestData = {
			password: form.password,
			token: form.token
		};

		fetchWithRefresh('/api/password-reset/reset', {
			method: 'POST',
			body: JSON.stringify(requestData),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: RESET_SUCCESS,
				});
				if (res.success) {
					localStorage.removeItem('forgotPage');
				}
			})
			.catch((err) => {
				alert(err.message);
				dispatch({
					type: RESET_FAILED,
				});
			});
	};
}

export function updateUser(form) {
	return function (dispatch) {

		const requestData = {
			email: form.email,
			name: form.name,
			password: form.password
		};

		dispatch({
			type: SET_USER,
		});

		requestWithAuth(API_USER_INFO, {
			method: 'PATCH',
			body: JSON.stringify(requestData),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: SET_USER_SUCCESS,
					user: res.user,
				});
				alert('Данные успешно сохранены')
			})
			.catch((err) => {
				dispatch({
					type: SET_USER_FAILED,
					error: err,
				});
			});
	};
}

export function getUser() {
	return function (dispatch) {
		dispatch({
			type: GET_USER,
		});

		requestWithAuth(API_USER_INFO, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
		.then((res) => {
			dispatch({
				type: GET_USER_SUCCESS,
				user: res.user,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_USER_FAILED,
				error: err,
			});
		});
	};
}
