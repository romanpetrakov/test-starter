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
					<a className={styles.linkActive + ' mr-2 p-5'} href='./'>
						<BurgerIcon type='primary' className=' mr-2' />
						<span className='text text_type_main-default'>Конструктор</span>
					</a>
					<a className={styles.link + ' ' + styles.linkLeft + ' p-5'} href='./'>
						<ListIcon type='secondary' className=' mr-2' />
						<span className='text text_type_main-default text_color_inactive'>
							Лента заказов
						</span>
					</a>
				</nav>
				<Logo />
				<nav className={styles.navRight + ' mt-4 mb-4'}>
					<a
						className={styles.link + ' ' + styles.linkRight + ' p-5'}
						href='./'>
						<ProfileIcon type='secondary' className=' mr-2' />
						<span className='text text_type_main-default text_color_inactive'>
							Личный кабинет
						</span>
					</a>
				</nav>
			</div>
		</header>
	);
};
