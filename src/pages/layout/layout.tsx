import { Outlet } from 'react-router-dom';

import styles from './layout.module.scss';
import { FC } from 'react';

export const Layout: FC = () => {
	return (
		<div className={styles.container + ' mt-15 pt-30 '}>
			<Outlet />
		</div>
	);
};
