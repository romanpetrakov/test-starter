import { FC, useMemo } from 'react';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, TOrder } from '../../utils/types';

import styles from './feed-item.module.scss';
import { useLocation } from 'react-router';
import { useAppSelector } from '../../../hooks/hooks';
import { Link } from 'react-router-dom';

export function getOrderStatusText(status?: string): {
	text: string;
	color: string;
} {
	switch (status) {
		case 'done':
			return { text: 'Выполнен', color: 'success' };
		case 'failed':
			return { text: 'Отменено', color: 'error' };
		case 'pending':
			return { text: 'Готовится', color: 'primary' };
		case 'created':
			return { text: 'Cоздан', color: 'primary' };
		default:
			return { text: 'Статус недоступен', color: 'primary' };
	}
}

export const FeedItem: FC<{
	order: TOrder;
	withStatus: boolean;
	path: string;
	context?: string;
}> = ({ order, withStatus, path }) => {
	const location = useLocation();
	const ingredients: TIngredient[] = useAppSelector(
		(state) => state.ingredients.ingredients
	);

	const ingredientsMap = useMemo(() => {
		const map = new Map<string, TIngredient>();
		ingredients.forEach((ingr) => map.set(ingr._id, ingr));
		return map;
	}, [ingredients]);

	const calculateOrderTotal = (order: TOrder): number => {
		return order.ingredients.reduce((total, ingredientId) => {
			const ingredient = ingredients.find((ing) => ing._id === ingredientId);
			return total + (ingredient?.price || 0);
		}, 0);
	};

	const orderStatus = useMemo(() => {
		if (order && withStatus) {
			return getOrderStatusText(order.status);
		}
	}, [order, withStatus]);

	const linkState = {
		backgroundLocation: {
			...location,
			state: { ...location.state, modal: true },
		},
		modal: true,
	};

	return (
		<div className={styles.item + ' p-6'}>
			<Link to={path} state={linkState}>
				<div className={styles.header + ' pb-6'}>
					<p className='text text_type_digits-default'>#{order.number}</p>
					<span className='text text_color_inactive text_type_main-default'>
						<FormattedDate date={new Date(order.createdAt)} />
					</span>
				</div>

				<p className={styles.name + ' text text_type_main-medium'}>
					{order.name || 'Без названия'}
				</p>

				{orderStatus && withStatus && (
					<p
						className={
							'text text_type_main-default text_color_' +
							orderStatus.color +
							' mt-2'
						}>
						{orderStatus.text}
					</p>
				)}

				<div className={styles.details + ' pt-6'}>
					<ul className={styles.ingredients + ' mr-6'}>
						{order.ingredients.slice(0, 6).map((orderId, index) => {
							const ingredient = ingredientsMap.get(orderId);
							if (!ingredient) {
								return null;
							}
							const isOverflow = index === 5 && order.ingredients.length > 6;

							return (
								<li
									key={index}
									className={`${styles.ingredient} ${
										isOverflow ? styles.blured : ''
									}`}
									style={{ '--i': index } as React.CSSProperties}>
									<div className={styles.ingredientContainer}>
										<img src={ingredient.image_mobile} alt={ingredient.name} />
										{isOverflow && (
											<span
												className={
													styles.more + ' text text_type_digits-default'
												}>
												+{order.ingredients.length - 5}
											</span>
										)}
									</div>
								</li>
							);
						})}
					</ul>
					<p className={styles.price}>
						<span className='text text_type_digits-default mr-2'>
							{calculateOrderTotal(order)}
						</span>
						<CurrencyIcon type='primary' />
					</p>
				</div>
			</Link>
		</div>
	);
};
