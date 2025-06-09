import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';

import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getUser, updateUser } from '../../services/auth/action';
import { TUser, TUserData } from '../utils/types';

export const Profile = () => {
	console.log('Profile');
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const setUserError = useAppSelector((state) => state.auth.setUserError);

	const [form, setForm] = useState<TUserData>({
		email: '',
		password: '',
		name: '',
	});
	const [isChanged, setIsChanged] = useState<boolean>(false);

	const [loadedUser, setLoadedUser] = useState<TUser>({ name: '', email: '' });

	const resetForm = useCallback(() => {
		setForm({
			email: user?.email || '',
			name: user?.name || '',
			password: '',
		});
	}, [user?.email, user?.name]);

	useEffect(() => {
		if (user) {
			setLoadedUser({ name: user.name, email: user.email });
			resetForm();
		}
	}, [user, resetForm]);

	useEffect(() => {
		if (!user) {
			dispatch(getUser());
		}
	}, [user, dispatch]);

	const inputRef = useRef<HTMLInputElement>(null);
	const onIconClick = () => {
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const handleChange = (e: FormEvent) => {
		const target = e.target as HTMLInputElement;
		const name = target.name as keyof TUser;
		const value = target.value;
		if (loadedUser[name] != value) {
			setIsChanged(true);
		}
		setForm({ ...form, [name]: value });
	};

	const handleReset = () => {
		setIsChanged(false);
		resetForm();
	};

	const handleSubmit = (e: FormEvent) => {
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
