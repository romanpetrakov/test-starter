import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginRequest } from '../../services/auth/action';
import styles from './login.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { TUserPassword } from '../../components/utils/types';

export const LoginPage: FC = () => {
	const { isLoading, loginError } = useAppSelector((state) => state.auth);

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [form, setForm] = useState<TUserPassword>({ email: '', password: '' });

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const handleToHome = () => {
		navigate('/', { state: location });
	};

	const handleToRegister = () => {
		navigate('/register', { state: location });
	};

	const handleToForgotPassword = () => {
		navigate('/forgot-password', { state: location });
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			dispatch(loginRequest(form));
			handleToHome();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.page}>
			<h1 className='text text_type_main-medium mb-6'>Вход</h1>
			<form
				onSubmit={handleSubmit}
				className={styles.form}
				data-testid='login-form'>
				<div className='mb-6' data-testid='email-input'>
					<EmailInput onChange={handleChange} value={form.email} name='email' />
				</div>
				<div className='mb-6' data-testid='password-input'>
					<PasswordInput
						onChange={handleChange}
						value={form.password}
						extraClass='mb-6'
						name='password'
					/>
				</div>
				{loginError && (
					<p className='text text_type_main-default text_color_error'>
						{loginError}
					</p>
				)}
				<div className='mb-20' data-testid='login-submit-btn'>
					<Button
						htmlType='submit'
						type='primary'
						size='large'
						disabled={isLoading}>
						{isLoading ? 'Загрузка...' : 'Войти'}
					</Button>
				</div>
			</form>
			<p className='text text_type_main-default text_color_inactive mb-2'>
				Вы новый пользователь?
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass='pb-1 pt-1'
					onClick={handleToRegister}
					disabled={isLoading}>
					Зарегистрироваться
				</Button>
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Забыли пароль?
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass='pb-1 pt-1'
					onClick={handleToForgotPassword}
					disabled={isLoading}>
					Восстановить пароль
				</Button>
			</p>
		</div>
	);
};
