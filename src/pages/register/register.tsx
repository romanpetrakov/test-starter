import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './register.module.scss';
import { registerRequest } from '../../services/auth/action';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { TUserData } from '../../components/utils/types';

export const RegisterPage: FC = () => {
	const { isLoading, isLoadedRegister, registerError } = useAppSelector(
		(state) => state.auth
	);

	const [form, setForm] = useState<TUserData>({
		email: '',
		password: '',
		name: '',
	});
	const location = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!!isLoadedRegister) {
			navigate('/');
		}
	}, [isLoadedRegister, navigate]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(registerRequest(form));
	};

	const handleToLogin = () => {
		navigate('/login', { state: location });
	};
	return (
		<div className={styles.page}>
			<h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<Input
					placeholder='Имя'
					onChange={handleChange}
					extraClass='mb-6'
					value={form.name}
					name='name'
				/>
				<EmailInput
					onChange={handleChange}
					value={form.email}
					extraClass='mb-6'
					name='email'
				/>
				<PasswordInput
					onChange={handleChange}
					value={form.password}
					extraClass='mb-6'
					name='password'
				/>
				{registerError && (
					<p className='text text_type_main-default text_color_error'>
						{registerError}
					</p>
				)}
				<Button
					htmlType='submit'
					type='primary'
					size='large'
					disabled={isLoading}
					extraClass='mb-20'>
					{isLoading ? 'Загрузка...' : 'Войти'}
				</Button>
			</form>
			<p className='text text_type_main-default text_color_inactive'>
				Уже зарегистрированы?
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					onClick={handleToLogin}
					extraClass='pt-1 pb-1'>
					Войти
				</Button>
			</p>
		</div>
	);
};
