import { authReducer, initialState } from './reducer';
import {
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	REGISTER,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	FORGOT,
	FORGOT_SUCCESS,
	FORGOT_FAILED,
	RESET,
	RESET_SUCCESS,
	RESET_FAILED,
	GET_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILED,
	SET_USER,
	SET_USER_SUCCESS,
	SET_USER_FAILED,
} from './action';

describe('auth reducer', () => {
	const mockUser = {
		name: 'Test User',
		email: 'test@example.com',
	};

	it('should return the initial state', () => {
		expect(authReducer(undefined, {} as any)).toEqual(initialState);
	});

	describe('LOGIN actions', () => {
		it('should handle LOGIN', () => {
			expect(authReducer(initialState, { type: LOGIN })).toEqual({
				...initialState,
				isLoading: true,
				isLoadedLogin: false,
				loginError: null,
			});
		});

		it('should handle LOGIN_SUCCESS', () => {
			expect(
				authReducer(initialState, { type: LOGIN_SUCCESS, user: mockUser })
			).toEqual({
				...initialState,
				user: mockUser,
				isLoading: false,
				isLoadedLogin: true,
			});
		});

		it('should handle LOGIN_FAILED', () => {
			const error = 'Login failed';
			expect(authReducer(initialState, { type: LOGIN_FAILED, error })).toEqual({
				...initialState,
				isLoading: false,
				isLoadedLogin: false,
				loginError: error,
			});
		});

		it('should handle LOGIN -> LOGIN_SUCCESS sequence', () => {
			const res = authReducer(initialState, { type: LOGIN });
			expect(authReducer(res, { type: LOGIN_SUCCESS, user: mockUser })).toEqual(
				{
					...initialState,
					user: mockUser,
					isLoading: false,
					isLoadedLogin: true,
				}
			);
		});

		it('should handle LOGIN -> LOGIN_FAILED sequence', () => {
			const res = authReducer(initialState, { type: LOGIN });
			const error = 'Login failed';
			expect(authReducer(res, { type: LOGIN_FAILED, error: error })).toEqual({
				...initialState,
				isLoading: false,
				isLoadedLogin: false,
				loginError: error,
			});
		});
	});

	describe('LOGOUT actions', () => {
		it('should handle LOGOUT', () => {
			expect(authReducer(initialState, { type: LOGOUT })).toEqual({
				...initialState,
				isLoading: true,
				isLoadedLogout: false,
				logoutError: null,
			});
		});

		it('should handle LOGOUT_SUCCESS', () => {
			const stateWithUser = { ...initialState, user: mockUser };
			expect(authReducer(stateWithUser, { type: LOGOUT_SUCCESS })).toEqual({
				...stateWithUser,
				user: null,
				isLoading: false,
				isLoadedLogout: true,
			});
		});

		it('should handle LOGOUT_FAILED', () => {
			const error = 'Logout failed';
			expect(
				authReducer(initialState, { type: LOGOUT_FAILED, logoutError: error })
			).toEqual({
				...initialState,
				isLoading: false,
				isLoadedLogout: false,
				logoutError: error,
			});
		});
	});

	describe('FORGOT actions', () => {
		it('should handle FORGOT', () => {
			expect(authReducer(initialState, { type: FORGOT })).toEqual({
				...initialState,
				isLoading: true,
				isLoadedForgot: false,
				forgotError: null,
			});
		});

		it('should handle FORGOT_SUCCESS', () => {
			expect(authReducer(initialState, { type: FORGOT_SUCCESS })).toEqual({
				...initialState,
				isLoading: false,
				isLoadedForgot: true,
			});
		});

		it('should handle FORGOT_FAILED', () => {
			const error = 'Forgot password failed';
			expect(
				authReducer(initialState, { type: FORGOT_FAILED, forgotError: error })
			).toEqual({
				...initialState,
				isLoading: false,
				isLoadedForgot: false,
				forgotError: error,
			});
		});
	});

	describe('RESET actions', () => {
		it('should handle RESET', () => {
			expect(authReducer(initialState, { type: RESET })).toEqual({
				...initialState,
				isLoading: true,
				isLoadedReset: false,
				resetError: null,
			});
		});

		it('should handle RESET_SUCCESS', () => {
			expect(authReducer(initialState, { type: RESET_SUCCESS })).toEqual({
				...initialState,
				isLoading: false,
				isLoadedReset: true,
			});
		});

		it('should handle RESET_FAILED', () => {
			const error = 'Reset failed';
			expect(
				authReducer(initialState, { type: RESET_FAILED, resetError: error })
			).toEqual({
				...initialState,
				isLoading: false,
				isLoadedReset: false,
				resetError: error,
			});
		});
	});

	describe('REGISTER actions', () => {
		it('should handle REGISTER', () => {
			expect(authReducer(initialState, { type: REGISTER })).toEqual({
				...initialState,
				isLoading: true,
				isLoadedRegister: false,
				registerError: null,
			});
		});

		it('should handle REGISTER_SUCCESS', () => {
			expect(
				authReducer(initialState, { type: REGISTER_SUCCESS, user: mockUser })
			).toEqual({
				...initialState,
				isLoading: false,
				isLoadedRegister: true,
				user: mockUser,
			});
		});

		it('should handle REGISTER_FAILED', () => {
			const error = 'Registration failed';
			expect(
				authReducer(initialState, {
					type: REGISTER_FAILED,
					registerError: error,
				})
			).toEqual({
				...initialState,
				isLoading: false,
				isLoadedRegister: false,
				registerError: error,
			});
		});
	});

	describe('GET_USER actions', () => {
		it('should handle GET_USER', () => {
			expect(authReducer(initialState, { type: GET_USER })).toEqual({
				...initialState,
				isLoading: true,
				isLoadedUser: false,
				getUserError: null,
			});
		});

		it('should handle GET_USER_SUCCESS', () => {
			expect(
				authReducer(initialState, { type: GET_USER_SUCCESS, user: mockUser })
			).toEqual({
				...initialState,
				isLoading: false,
				isLoadedUser: true,
				user: mockUser,
			});
		});

		it('should handle GET_USER_FAILED', () => {
			const error = 'Get user failed';
			expect(
				authReducer(initialState, { type: GET_USER_FAILED, error: error })
			).toEqual({
				...initialState,
				isLoading: false,
				isLoadedUser: false,
				getUserError: error,
			});
		});
	});

	describe('SET_USER actions', () => {
		it('should handle SET_USER', () => {
			expect(authReducer(initialState, { type: SET_USER })).toEqual({
				...initialState,
				isLoading: true,
				isSettedUser: false,
				setUserError: null,
			});
		});

		it('should handle SET_USER_SUCCESS', () => {
			expect(
				authReducer(initialState, { type: SET_USER_SUCCESS, user: mockUser })
			).toEqual({
				...initialState,
				isLoading: false,
				isSettedUser: true,
				user: mockUser,
			});
		});

		it('should handle SET_USER_FAILED', () => {
			const error = 'Set user failed';
			expect(
				authReducer(initialState, { type: SET_USER_FAILED, error: error })
			).toEqual({
				...initialState,
				isLoading: false,
				isSettedUser: false,
				setUserError: error,
			});
		});
	});

	it('should return current state for unknown action', () => {
		expect(
			authReducer(initialState, { type: 'UNKNOWN_ACTION' } as any)
		).toEqual(initialState);
	});
});
