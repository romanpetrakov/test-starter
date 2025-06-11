import { FC } from 'react';

import styles from './feed.module.scss';
import { FeedItem } from './feed-item/feed-item';
import { TOrder } from '../utils/types';
import { useLocation } from 'react-router';

export const Feed: FC<{
	orders: TOrder[];
	withStatus?: boolean;
	context?: string;
}> = ({ orders, withStatus = false, context }) => {
	const location = useLocation();

	const basePath =
		context === 'profile' ? '/profile/orders' : location.pathname;

	return (
		<div className={styles.feedList + ' pr-6 mr-15'}>
			{orders.map((order: TOrder) => {
				return (
					<FeedItem
						key={order._id}
						order={order}
						path={basePath + '/' + order.number}
						withStatus={withStatus}
						context={context}
					/>
				);
			})}
		</div>
	);
};
