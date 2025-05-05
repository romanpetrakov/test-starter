import { useState, useEffect, useRef } from 'react';

import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from 'react-redux';
import { getUser, updateUser } from '../../services/auth/action';

export const Profile = () => {
	const dispatch = useDispatch();
	const { user, isLoading, setUserError } = useSelector((state) => state.auth);
	const [form, setForm] = useState({ email: '', password: '', name: '' });
	const [isChanged, setIsChanged] = useState(false);
	const [loadedUser, setLoadedUser] = useState({
		email: '',
		password: '',
		name: '',
	});
	const inputRef = useRef(null);
	const resetForm = () => {
		setForm({ ...form, email: user?.email, name: user?.name, password: '' });
	};
	useEffect(() => {
		setLoadedUser({ ...loadedUser, name: user.name, email: user.email });
		resetForm();
	}, [user, loadedUser]);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const onIconClick = () => {
		setTimeout(() => inputRef.current.focus(), 0);
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.valuse;
		if (loadedUser[name] != value) {
			setIsChanged(true);
		}
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleReset = () => {
		setIsChanged(false);
		resetForm();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUser(form));
		setIsChanged(false);
	};

	return (
		<form method='POST' onSubmit={handleSubmit} autoComplete='off'>
			<div className='mb-6'>
				<Input
					placeholder='Имя'
					icon={'EditIcon'}
					type={'text'}
					onChange={handleChange}
					name='name'
					ref={inputRef}
					onIconClick={onIconClick}
					value={form?.name || ''}
				/>
			</div>
			<div className='mb-6'>
				<EmailInput
					isIcon={true}
					value={form?.email || ''}
					onChange={handleChange}
					autoComplete='username'
					name='email'
				/>
			</div>
			<div className='mb-6'>
				<PasswordInput
					value={form.password}
					onChange={handleChange}
					autoComplete='current-password'
					name='password'
				/>
			</div>
			{setUserError && (
				<p className='text text_type_main-default text_color_error'>
					{setUserError}
				</p>
			)}
			{!isLoading && isChanged && (
				<div className='mb-6'>
					<Button
						htmlType='reset'
						type='secondary'
						size='large'
						onClick={handleReset}>
						Отмена
					</Button>
					<Button htmlType='submit' type='primary' size='large'>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
