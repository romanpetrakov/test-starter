import { useNavigate, NavLink, Outlet } from 'react-router-dom';

import styles from './profile.module.scss';

import { logoutRequest } from '../../services/auth/action';
import { FC, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/hooks';

export const ProfilePage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		dispatch(logoutRequest());
		navigate('/login');
	};

	return (
		<div className={styles.container}>
			<div className={styles.menu + ' mr-15'}>
				<ul className={styles.list + ' mb-20'}>
					<li className={styles.item}>
						<NavLink
							to='/profile'
							className={({ isActive }) =>
								' text text_type_main-medium' +
								(isActive ? '' : ' text_color_inactive')
							}
							end>
							Профиль
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink
							to='/profile/orders'
							className={({ isActive }) =>
								' text text_type_main-medium' +
								(isActive ? '' : ' text_color_inactive')
							}
							end>
							История заказов
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink
							to=''
							className='text text_type_main-medium text_color_inactive'
							onClick={handleLogout}>
							Выход
						</NavLink>
					</li>
				</ul>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};
