import { FC } from 'react';
import { TOrder } from '../../utils/types';
import styles from './feed-order.module.scss';

export const FeedOrder: FC<{
	total: number;
	totalToday: number;
	doneOrders: TOrder[];
	pendingOrders: TOrder[];
}> = ({ total, totalToday, doneOrders, pendingOrders }) => {
	return (
		<div className={styles.container}>
			<div className={`${styles.ordersActual} mb-15`}>
				<div className={`mr-9 ${styles.orderNums}`}>
					<h4 className='text text_type_main-medium pb-6'>Готовы:</h4>
					<ul>
						{doneOrders.map((order: TOrder) => (
							<li
								key={order._id}
								className={`${styles.orderNum} ${styles.orderReady} text text_type_digits-default mb-2`}>
								{order.number}
							</li>
						))}
					</ul>
				</div>
				<div className={styles.orderNums}>
					<h4 className='text text_type_main-medium pb-6'>В работе:</h4>
					<ul>
						{pendingOrders.map((order: TOrder) => (
							<li
								key={order._id}
								className={`${styles.orderNum} ${styles.orderReady} text text_type_digits-default mb-2`}>
								{order.number}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={`${styles.ordersTotal} mb-15`}>
				<h4 className='text text_type_main-medium'>Выполнено за все время:</h4>
				<p className='text text_type_digits-large'>{total}</p>
			</div>
			<div className={`${styles.ordersTotal} mb-15`}>
				<h4 className='text text_type_main-medium'>Выполнено за сегодня:</h4>
				<p className='text text_type_digits-large'>{totalToday}</p>
			</div>
		</div>
	);
};
