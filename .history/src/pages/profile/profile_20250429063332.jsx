import { useLocation, useNavigate, NavLink, Outlet } from 'react-router-dom';


import styles from './profile.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logoutRequest } from '../../ ../../services/auth/action';

export const ProfilePage = () => {

    const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutRequest());
		navigate('/login');

	};
	const menuItems = [
		{id: 1, link: "/profile", name: "Профиль"},
		{id: 2, link: "/profile/orders", name: "История заказов"},
	];

	return (
        <div className={styles.container}>
            <div className={styles.menu + ' mr-15'}>
                <ul className={styles.list + ' mb-20'}>
					{
						menuItems. map(elem => {
							return (
								<li key={elem.id} className={styles.item}>
									<NavLink to={elem.link} className={({isActive}) => ' text text_type_main-medium' + (isActive ? '' : " text_color_inactive")}>
										{elem.name}
									</NavLink>
								</li>
							)
						})
					}
					<li  className={styles.item}>
					<NavLink className="text text_type_main-medium text_color_inactive" onClick={handleLogout}>
                            Выход
                        </NavLink>
					</li>
                </ul>
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}