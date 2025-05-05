import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
//import { useDispatch } from "react-redux";
import styles from './reset-password.module.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFromStorage, removeFromStorage } from '../../components/utils/storage';

export const ResetPasswordPage = () => {
	const { isLoading, isLoadedReset } = useSelector((state) => state.auth);

	const location = useLocation();
	const navigate = useNavigate();

	const [form, setValue] = useState({ password: '', token: ''});

	const handleChange = e => {
	  setValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleToLogin = () => {
        navigate('/login', { state: location });
    };

	const handleSubmit = () => {
		e.preventDefault();
		dispatch(resetRequest(form));
    };

	useEffect(() => {
		if (!getFromStorage("isLoadedReset")) {
			 navigate(-1);
		} else {
	//		removeFromStorage("isLoadedReset");
		}
	}, []);

	return (
		<div className={styles.page} >
			 <h1 className="text text_type_main-medium mb-6">
			 Восстановление пароля
            </h1>
		<form  onSubmit={handleSubmit} className={styles.form}>
			<PasswordInput
				placeholder='Введите новый пароль'
				value={form.password}
				name='password'
				onChange={handleChange}
				extraClass="mb-6"
			/>
			<Input
				placeholder='Введите код из письма'
				value={form.token}
				name='token'
				onChange={handleChange}
				extraClass="mb-6"
			/>

			<Button htmlType="submit" type="primary" size="large" disabled={isLoading}  extraClass="mb-20">
				{isLoading ? "Загрузка..." : "Восстановить"}
			</Button>
		</form>
            <p className="text text_type_main-default text_color_inactive">
				Вспомнили пароль?
				<Button htmlType="button" type="secondary" size="medium" onClick={handleToLogin}>
					Войти
				</Button>
            </p>
		</div>
	);
}
