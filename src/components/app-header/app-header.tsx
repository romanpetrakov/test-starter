import { NavLink } from 'react-router-dom';
import styles from './app-header.module.scss';

import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
	return (
		<header className={styles.header + ' mr-4'}>
			<div className={styles.headerContainer}>
				<nav className={styles.nav + ' mt-4 mb-4'}>
					<NavLink to='/' className={' p-5'}>
						{({ isActive }) => (
							<div
								className={
									(isActive ? styles.linkActive : styles.link) + ' mr-2 p-5'
								}>
								<BurgerIcon
									type={isActive ? 'primary' : 'secondary'}
									className='mr-2'
								/>
								<span
									className={
										'text text_type_main-default ' +
										(isActive ? '' : 'text_color_inactive')
									}>
									Конструктор
								</span>
							</div>
						)}
					</NavLink>
					<NavLink to='feed' className={' p-5'}>
						{({ isActive }) => (
							<div
								className={
									(isActive ? styles.linkActive : styles.link) + ' mr-2 p-5'
								}>
								<ListIcon
									type={isActive ? 'primary' : 'secondary'}
									className='mr-2'
								/>
								<span
									className={
										'text text_type_main-default ' +
										(isActive ? '' : 'text_color_inactive')
									}>
									Лента заказов
								</span>
							</div>
						)}
					</NavLink>
				</nav>
				<Logo />
				<nav className={styles.navRight + ' mt-4 mb-4'}>
					<NavLink to='/profile' className={styles.linkRight + ' p-5'}>
						{({ isActive }) => (
							<div
								className={
									(isActive ? styles.linkActive : styles.link) + ' mr-2 p-5'
								}>
								<ProfileIcon
									type={isActive ? 'primary' : 'secondary'}
									className='mr-2'
								/>
								<span
									className={
										'text text_type_main-default ' +
										(isActive ? '' : 'text_color_inactive')
									}>
									Личный кабинет
								</span>
							</div>
						)}
					</NavLink>
				</nav>
			</div>
		</header>
	);
};
