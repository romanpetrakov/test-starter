import { API_LOGIN, API_PASSWORD_RESET, API_REGISTER } from '../../components/utils/endpoints';
import { request } from '../../components/utils/request';
import { getFromStorage, setToStorage } from '../../components/utils/storage';

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
				console.log(res);
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

// export function refreshToken(data) {
// 	return function (dispatch) {
// 		dispatch({
// 			type: LOGIN_REQUEST,
// 		});

// 		fetchWithRefresh('/api/auth/login', {
// 			method: 'POST',
// 			body: data,
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8',
// 			},
// 		})
// 			.then((res) => {
// 				dispatch({
// 					type: LOGIN_SUCCESS,
// 					payload: res,
// 				});
// 			})
// 			.catch((err) => {
// 				dispatch({
// 					type: LOGIN_FAILED,
// 					payload: err,
// 				});
// 			});
// 	};
// }

// export function logoutRequest() {
// 	return function (dispatch) {
// 		dispatch({
// 			type: LOGOUT_REQUEST,
// 		});
// 		// dispatch({
// 		// 	type: LOGOUT_SUCCESS,
// 		// });

// 		fetchWithRefresh('/api/auth/logout', {
// 			method: 'POST',
// 			body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8',
// 			},
// 		})
// 			.then(() => {
// 				dispatch({
// 					type: LOGOUT_SUCCESS,
// 				});
// 				localStorage.removeItem('refreshToken');
// 				localStorage.removeItem('accessToken');
// 				dispatch(checkUserAuth());
// 			})
// 			.catch((err) => {
// 				dispatch({
// 					type: LOGOUT_FAILED,
// 					payload: err,
// 				});
// 			});
// 	};
// }

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
			alert(err.message);
			dispatch({
				type: REGISTER_FAILED,
				error: err,
			});
			throw err
		});
	};
}
export function forgotRequest(form) {
	return function (dispatch) {
		dispatch({
			type: FORGOT,
			isLoading: true
		});

		const requestData = {
			email: form.email
		};
		return request(API_PASSWORD_RESET, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(requestData),
			})
			.then((res) => {
				dispatch({
					type: FORGOT_SUCCESS,
				});
			})
			.catch((error) => {
				console.error('error:' + error);
				dispatch({
					type: FORGOT_FAILED,
				});
			});
	};
};

// 		fetchWithRefresh('/api/password-reset', {
// 			method: 'POST',
// 			body: data,
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8',
// 			},
// 		})
// 			.then((res) => {
// 				dispatch({
// 					type: FORGOT_SUCCESS,
// 					payload: res,
// 				});
// 			})
// 			.catch((err) => {
// 				alert(err.message);
// 				dispatch({
// 					type: FORGOT_FAILED,
// 					payload: err,
// 				});
// 			});
// 	};
// }

// export function resetPassword(data) {
// 	return function (dispatch) {
// 		dispatch({
// 			type: RESET_PASSWORD_REQUEST,
// 		});

// 		fetchWithRefresh('/api/password-reset/reset', {
// 			method: 'POST',
// 			body: data,
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8',
// 			},
// 		})
// 			.then((res) => {
// 				dispatch({
// 					type: RESET_PASSWORD_SUCCESS,
// 					payload: res,
// 				});
// 				if (res.success) {
// 					localStorage.removeItem('forgotPage');
// 				}
// 			})
// 			.catch((err) => {
// 				alert(err.message);
// 				dispatch({
// 					type: RESET_PASSWORD_FAILED,
// 					payload: err,
// 				});
// 			});
// 	};
// }
// export function updateUser(data) {
// 	return function (dispatch) {
// 		dispatch({
// 			type: REFRESH_USER_REQUEST,
// 		});

// 		fetchWithRefresh('/api/auth/user', {
// 			method: 'PATCH',
// 			body: data,
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8',
// 			},
// 		})
// 			.then((res) => {
// 				dispatch({
// 					type: SET_USER,
// 					payload: res.user,
// 				});
// 				alert('Данные успешно сохранены')
// 			})
// 			.catch((err) => {
// 				dispatch({
// 					type: REFRESH_USER_FAILED,
// 					payload: err,
// 				});
// 			});
// 	};
// }

export function getUser() {
	return function (dispatch) {
		dispatch({
			type: GET_USER,
		});

		fetchWithRefresh('/api/auth/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: GET_USER_SUCCES,
					user: res.user,
				});
			})
			.catch((err) => {
				dispatch({
					type: GET_USER_FAILED,
					payload: err,
				});
			})
			.finally(() => {
				dispatch({
					type: SET_AUTH_FLAG,
					payload: true,
				});
			});
	};
}

// export function checkUserAuth() {
// 	return function (dispatch) {
// 		if (localStorage.getItem('accessToken')) {
// 			dispatch(getUser());
// 		} else {
// 			dispatch({
// 				type: SET_AUTH_FLAG,
// 				payload: true,
// 			});
// 		}
// 	};
// }