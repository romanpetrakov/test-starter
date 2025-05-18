import {
	PasswordInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset-password.module.scss';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getFromStorage,
	removeFromStorage,
} from '../../components/utils/storage';
import { resetPassword } from '../../services/auth/action';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { TUserWithToken } from '../../components/utils/types';

export const ResetPasswordPage: FC = () => {
	const { isLoading, isLoadedReset, resetError } = useAppSelector(
		(state) => state.auth
	);
	const isLoadedForgot = getFromStorage('isLoadedForgot');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [form, setValue] = useState<TUserWithToken>({
		password: '',
		token: '',
	});

	useEffect(() => {
		if (!isLoadedForgot) {
			navigate('/login', { replace: true });
		}
	}, [isLoadedForgot, navigate]);

	useEffect(() => {
		if (isLoadedReset) {
			removeFromStorage('isLoadedForgot');
			navigate('/login', { replace: true });
		}
	}, [isLoadedReset, navigate]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...form, [event.target.name]: event.target.value });
	};

	const handleToLogin = () => {
		navigate('/login', { replace: true });
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(resetPassword(form));
	};

	return (
		<div className={styles.page}>
			<h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
			{resetError && (
				<p className='text text_type_main-default text_color_error'>
					{resetError}
				</p>
			)}
			<form onSubmit={handleSubmit} className={styles.form}>
				<PasswordInput
					placeholder='Введите новый пароль'
					value={form.password}
					name='password'
					onChange={handleChange}
					extraClass='mb-6'
				/>
				<Input
					placeholder='Введите код из письма'
					value={form.token}
					name='token'
					onChange={handleChange}
					extraClass='mb-6'
				/>

				<Button
					htmlType='submit'
					type='primary'
					size='large'
					disabled={isLoading}
					extraClass='mb-20'>
					{isLoading ? 'Загрузка...' : 'Восстановить'}
				</Button>
			</form>
			<p className='text text_type_main-default text_color_inactive'>
				Вспомнили пароль?
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					onClick={handleToLogin}>
					Войти
				</Button>
			</p>
		</div>
	);
};
