import styles from './app-header.module.scss';

import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
	return (
		<header className={styles.header + 'mr-4'}>
			<div className={styles.headerContainer}>
				<nav className={styles.nav}>
					<a className={styles.linkActive + ' pl-5 pr-5 pt-4 mr-2'} href='./'>
						<BurgerIcon type='primary' className=' mr-2' />
						<span className='text text_type_main-default'>Конструктор</span>
					</a>
					<a className={styles.link + ' pl-5 pr-5 pt-4  mr-2'} href='./'>
						<ListIcon type='primary' className=' mr-2' />
						<span className='text text_type_main-default text_color_inactive'>
							Лента заказов
						</span>
					</a>
				</nav>
				<Logo />
				<nav className={styles.nav}>
					<a className={styles.link + ' pl-5 pr-5 pt-4  mr-2'} href='./'>
						<ProfileIcon type='primary' className=' mr-2' />
						<span className='text text_type_main-default text_color_inactive'>
							Личный кабинет
						</span>
					</a>
				</nav>
			</div>
		</header>
	);
};
