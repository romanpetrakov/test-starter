import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './forgot-password.module.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { forgotRequest } from '../../services/auth/action';
import { setToStorage } from '../../components/utils/storage';

export const ForgotPasswordPage = () => {
	const { isLoading, isLoadedForgot } = useSelector((state) => state.auth);

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [form, setValue] = useState({ email: '' });

	const handleChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleLogin = () => {
		navigate('/login', { state: location });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(forgotRequest(form));
	};
	useEffect(() => {
		if (isLoadedForgot) {
			setToStorage('isLoadedReset', true);
			navigate('/reset-password');
		}
	}, [isLoadedForgot]);
	return (
		<div className={styles.page}>
			<h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<EmailInput
					onChange={handleChange}
					value={form.email}
					name='email'
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
					onClick={handleLogin}>
					Войти
				</Button>
			</p>
		</div>
	);
};
