import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
//import { api } from '../../utils/api';

import styles from './profile.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUser, updateUser } from '../../services/auth/action';



export const Profile = () => {

	const dispatch = useDispatch();
	const {user, isLoading, setUserError} = useSelector((state) => state.auth);
	const [form, setForm] = useState({ email: '', password: '', name: ''});
	const [isChanged, setIsChanged] = useState(false);
	
    const inputRef = useRef(null);
	const resetForm = () => {
		setForm({...form, email: user?.email, name: user?.name, password: form?.password});
	}
	 useEffect(() => {

		resetForm();
	 }, [user]);


     useEffect(() => {
		dispatch(getUser(form))
     }, []);

	 const onIconClick = () => {
		setTimeout(() => inputRef.current.focus(), 0)
	  }

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleReset = () => {
        resetForm();
    }

     const handleSubmit = e => {
         e.preventDefault();
		 dispatch(updateUser(form))
     }

    return (
        <form method="POST" onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-6">
                <Input placeholder='Имя' icon={'EditIcon'} type={'text'} onChange={handleChange} name="name"
                ref={inputRef}
				onIconClick={onIconClick}
				value={form?.name||''}
				/>
            </div>
            <div className="mb-6">
                <EmailInput isIcon={true} value={form?.email||""} onChange={handleChange} autoComplete="username" name="email"/>
            </div>
            <div className="mb-6">
                <PasswordInput value={form.password} onChange={handleChange} autoComplete="current-password" name="password" />
            </div>
			{setUserError && <p className="text text_type_main-default text_color_error">{setUserError}</p>}
            {!isLoading && isСhanged
                <div className={`${styles.btn_container} mb-6`}>
                    <Button htmlType="reset" type="secondary" size="large" onClick={handleReset}>
                        Отмена
                    </Button>
                    <Button htmlType="submit" type="primary" size="large">
                        Сохранить
                    </Button>
                </div>
            }
        </form>
    )
}