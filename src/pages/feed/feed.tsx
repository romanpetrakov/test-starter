import { FC, useEffect, useMemo } from 'react';
import styles from './feed.module.scss';
import { Feed } from '../../components/feed/feed';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
	wsConnectionClosed,
	wsConnectionStart,
} from '../../services/websocket/actions';
import { TOrder } from '../../components/utils/types';
import { FeedOrder } from '../../components/feed/feed-order/feed-order';

export const FeedPage: FC = () => {
	const dispatch = useAppDispatch();
	const {
		messages: orders,
		total,
		totalToday,
	} = useAppSelector((store) => store.webSocket);

	useEffect(() => {
		dispatch(wsConnectionStart());
		return () => {
			dispatch(wsConnectionClosed());
		};
	}, [dispatch]);

	const pendingOrders = useMemo(
		() =>
			orders
				.filter((order: TOrder) => {
					return order.status !== 'done';
				})
				.slice(0, 10),
		[orders]
	);
	const doneOrders = useMemo(
		() =>
			orders
				.filter((order: TOrder) => {
					return order.status === 'done';
				})
				.slice(0, 10),
		[orders]
	);

	return (
		<section className={styles.container}>
			<div className={styles.orders}>
				<h1 className={'text text_type_main-large mb-5 pt-10'}>
					Лента заказов
				</h1>
				<Feed orders={orders} />
			</div>
			<div className={styles.ordersInfo + ' mt-25 custom-scroll '}>
				<FeedOrder
					total={total || 0}
					totalToday={totalToday || 0}
					doneOrders={doneOrders}
					pendingOrders={pendingOrders}
				/>
			</div>

			{/*
            <Modal isOpen={isOpen} onClose={closeAll} onOverlayClick={closeAll} onEscPress={closeAll}>
                {isOrderModal && <OrderComponents/>}
            </Modal> */}
		</section>
	);
};
