import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginRequest } from '../../services/auth/action'
import styles from './login.module.scss';
import { useSelector } from 'react-redux';

export const LoginPage = () => {

	const {user, isLoading, loginError } = useSelector(
		(state) => state.auth
	);

//	const [isLoading, setIsLoading] = useState(false);
//	const [error, setError] = useState('');


	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [form, setForm] = useState({ email: '', password: '' });

	useEffect(() => {
		setForm({...form, {...form, email: user.email}})
	},[user]);
	const handleChange = e => {
	  setValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleToHome = () => {
        navigate(-1);
    };

	const handleToRegister = () => {
        navigate('/register', { state: location });
    };

    const handleToForgotPassword = () => {
        navigate('/forgot-password', { state: location });
    };

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginRequest(form));
		handleToHome();
    };

	return (
		<div className={styles.page} >
			 <h1 className="text text_type_main-medium mb-6">
                Вход
            </h1>
			<form  onSubmit={handleSubmit} className={styles.form}>
                <EmailInput onChange={handleChange} value={user?.email || ""} name="email" extraClass="mb-6" />
                <PasswordInput onChange={handleChange} value="" extraClass="mb-6" name='password'/>
				{loginError && <p className="text text_type_main-default text_color_error">{loginError}</p>}
				<Button htmlType="submit" type="primary" size="large" disabled={isLoading}  extraClass="mb-20">
					{isLoading ? "Загрузка..." : "Войти"}
				</Button>
            </form>
            <p className="text text_type_main-default text_color_inactive mb-2">
                Вы новый пользователь?
                <Button htmlType="button" type="secondary" size="medium" extraClass="pb-1 pt-1" onClick={handleToRegister} disabled={isLoading}>
                    Зарегистрироваться
                </Button>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?
                <Button htmlType="button" type="secondary" size="medium" extraClass="pb-1 pt-1" onClick={handleToForgotPassword} disabled={isLoading}>
                    Восстановить пароль
                </Button>
            </p>
		</div>
	);
}