import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
	wsConnectionClosed,
	wsConnectionStartForUser,
} from '../../services/websocket/actions';
import { Feed } from '../../components/feed/feed';

export const OrdersPage: FC = () => {
	console.log('OrdersPage');
	//	const ingredients = useAppSelector((state) => state.ingredients.ingredients);
	const dispatch = useAppDispatch();

	const { messages: orders } = useAppSelector((state) => state.webSocket);
	useEffect(() => {
		dispatch(wsConnectionStartForUser());

		return () => {
			dispatch(wsConnectionClosed());
		};
	}, [dispatch]);

	return (
		<section>
			<div>
				<Feed orders={orders} withStatus={true} context='/profile' />
			</div>
		</section>
	);
};
