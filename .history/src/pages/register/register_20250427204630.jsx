import { useState } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate} from 'react-router-dom';

import styles from './register.module.scss';
import { useSelector } from 'react-redux';
import { registerRequest } from '../../services/auth/action';
import { useDispatch } from 'react-redux';

export const RegisterPage = () => {

	const {isLoading, isLoadedRegister, registerError } = useSelector(
		(state) => state.auth
	);


	 const [form, setForm] = useState({ email: '', password: '', login: ''});
	 const dispatch = useDispatch();
	 const navigate = useNavigate();

	 useEffect(() => {
		navigate('/');
	}, [isLoadedRegister]);

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleToHome = () => {
        navigate('/');
    };

    const handleSubmit = (e) => {
			e.preventDefault();
			dispatch(registerRequest(form));
    }

	const handleToLogin = () => {
       navigate('/login', {state: location});
    }

	return (
        <div className={styles.page} >
            <h1 className="text text_type_main-medium mb-6">
                Регистрация
            </h1>
			<form  onSubmit={handleSubmit} className={styles.form}>
				<Input placeholder='Имя' onChange={handleChange} extraClass="mb-6" value={form.login} name="login"/>
                <EmailInput onChange={handleChange} value={form.email} extraClass="mb-6" name="email"/>
                <PasswordInput onChange={handleChange} value={form.password} extraClass="mb-6" name="password"/>
                {registerError && <p className="text text_type_main-default text_color_error">{registerError}</p>}
				<Button htmlType="submit" type="primary" size="large" disabled={isLoading}  extraClass="mb-20">
					{isLoading ? "Загрузка..." : "Войти"}
				</Button>
            </form>
            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы?
                <Button htmlType="button" type="secondary" size="medium" onClick={handleToLogin}  extraClass="pt-1 pb-1">
                    Войти
                </Button>
            </p>
        </div>
    )
}