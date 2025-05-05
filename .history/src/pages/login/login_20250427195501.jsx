import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginRequest } from '../../services/auth/action'
import styles from './login.module.scss';

export const LoginPage = () => {

	
	const isLoading = useSelector((state) => state..ingredients);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [form, setValue] = useState({ email: '', password: '' });

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
		try{
			setIsLoading(true);
			setError('');
			e.preventDefault();
			dispatch(loginRequest(form));
		//	debugger;
	//		handleToHome();
		} catch (err) {
			setError(err);
		//	debugger;
		}
		setIsLoading(false);

    };

	return (
		<div className={styles.page} >
			 <h1 className="text text_type_main-medium mb-6">
                Вход
            </h1>
			<form  onSubmit={handleSubmit} className={styles.form}>
                <EmailInput onChange={handleChange} value={form.email} name='email' extraClass="mb-6" />
                <PasswordInput onChange={handleChange} value={form.password} extraClass="mb-6" name='password'/>
                {error && <p className="text text_type_main-default text_color_error">{error}</p>}
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
			{error && <p className="text text_type_main-default text_color_error">{error}</p>}
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?
                <Button htmlType="button" type="secondary" size="medium" extraClass="pb-1 pt-1" onClick={handleToForgotPassword} disabled={isLoading}>
                    Восстановить пароль
                </Button>
            </p>
		</div>
	);
}