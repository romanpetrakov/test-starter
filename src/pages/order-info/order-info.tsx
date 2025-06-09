import { FC } from 'react';
import styles from './order-info.module.scss';
import { OrderInfo } from '../../components/orders/order-info';

export const OrderInfoPage: FC = () => {
	return (
		<div className={styles.container + ' pt-30 '}>
			<div className='mb-8'>
				<OrderInfo />
			</div>
		</div>
	);
};
