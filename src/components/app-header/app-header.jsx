import styles from './app-header.module.scss';

import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const HeaderItemConstructor = () => {
	return (
		<a className={styles.link_active + ' p-5 mr-2'} href='./'>
			<BurgerIcon type='primary' className='mr-2 pr-1' />
			<p className='text text_type_main-default'>Конструктор</p>
		</a>
	);
};

const HeaderItemOrder = () => {
	return (
		<a className={styles.link + ' p-5 mr-2'} href='./'>
			<ListIcon type='primary' className='mr-2 pr-1' />
			<p className='text text_type_main-default text_color_inactive'>
				Лента заказов
			</p>
		</a>
	);
};

const HeaderItemProfile = () => {
	return (
		<a className={styles.link + ' p-5 mr-2'} href='./'>
			<ProfileIcon type='primary' className='pr-1 mr-2' />
			<p className='text text_type_main-default text_color_inactive'>
				Личный кабинет
			</p>
		</a>
	);
};

export const AppHeader = () => {
	return (
		<header className={styles.header + 'mr-4'}>
			<div className={styles.header_container}>
				<nav className={styles.nav}>
					<HeaderItemConstructor />
					<HeaderItemOrder />
				</nav>
				<Logo />
				<nav className={styles.nav}>
					<HeaderItemProfile />
				</nav>
			</div>
		</header>
	);
};
