//import {OrderIngredient} from "./order-ingredient/order-ingredient";
//import {useAppSelector} from "../../utils/hooks/useAppSelector";
import styles from './order-info.module.scss';
import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useParams } from 'react-router';
import { getOrderInfo } from '../../services/order/action';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../utils/types';
import { getOrderStatusText } from '../feed/feed-item/feed-item';

interface IUnknowIngredient {
	_id: string;
	name: string;
	price: number;
	image_mobile?: string; // если используется в <img>
	image?: string; // если нужно
	type?: never;
}

export const OrderInfo: FC = () => {
	const dispatch = useAppDispatch();
	const { number } = useParams();

	const { messages: orders } = useAppSelector((store) => store.webSocket);

	const { orderInfo } = useAppSelector((store) => store.order);
	const { ingredients } = useAppSelector((store) => store.ingredients);

	const order =
		orders.find((order) => order.number === Number(number)) || orderInfo;

	useEffect(() => {
		if (!order && number) {
			dispatch(getOrderInfo(number));
		}
	}, [number, order, dispatch]);

	const getIngredientInfo = (id: string): TIngredient | IUnknowIngredient => {
		const ingredient = ingredients.find((elem) => elem._id === id);
		return (
			ingredient || {
				_id: id,
				name: `Неизвестный ингредиент (ID: ${id})`,
				price: 0,
			}
		);
	};

	const ingredientCounts: Record<string, number> =
		order?.ingredients?.reduce((acc: Record<string, number>, _id: string) => {
			acc[_id] = (acc[_id] || 0) + 1;
			return acc;
		}, {}) || {};

	const ingredientsInfo = Object.entries(ingredientCounts).map(
		([_id, count]) => {
			const ingredient = getIngredientInfo(_id);
			console.log(ingredient);
			return {
				...ingredient,
				_id,
				count,
				totalPrice: ingredient.price * count,
			};
		}
	);

	const knownIngredients = ingredientsInfo.filter((elem) =>
		ingredients.some((x) => x._id === elem._id)
	);

	const unknownIngredients = ingredientsInfo.filter(
		(elem) => !ingredients.some((x) => x._id === elem._id)
	);

	const totalPrice: number = knownIngredients.reduce(
		(sum, item) => sum + item.totalPrice,
		0
	);

	const orderStatus = useMemo(() => {
		return getOrderStatusText(order?.status);
	}, [order]);

	if (!order) {
		return <div className={styles.loading}>Загрузка заказа...</div>;
	}

	if (!ingredients.length) {
		return <div className={styles.loading}>Загрузка ингредиентов...</div>;
	}

	return (
		<div className={styles.container}>
			<p className={styles.header + ' text text_type_digits-default'}>
				#{order.number}
			</p>

			<div className={styles.status + ' mt-10'}>
				<p className='text text_type_main-medium'>{order.name}</p>
			</div>
			{orderStatus && (
				<p
					className={
						styles.status +
						' text text_type_main-small text_color_' +
						orderStatus.color +
						' mt-3'
					}>
					{orderStatus.text}
				</p>
			)}
			<p className='text text_type_main-default mt-15 mb-6'>Состав:</p>

			<ul className={styles.ingredients + ' pr-6 mb-10'}>
				{[...knownIngredients, ...unknownIngredients].map((ingredient) => {
					return (
						<li key={ingredient._id} className={styles.ingredient + ' mb-4'}>
							<div className={styles.ingredientContainer}>
								<div className={styles.imgWrapper + ' mr-4'}>
									<div className={styles.imgInner}>
										<img
											className={styles.img + ' mr-4'}
											src={ingredient.image_mobile || ''}
											alt={ingredient.name}
										/>
									</div>
								</div>
								<p>
									<span className='text text_type_main-default'>
										{ingredient.name}
									</span>
								</p>
							</div>
							<div className={styles.price}>
								<span className='mr-2 text_type_digits-default '>
									{ingredient.count} x {ingredient.price}
								</span>
								<CurrencyIcon type={'primary'} />
							</div>
						</li>
					);
				})}
			</ul>

			<div className={styles.total + ' mb-6'}>
				<span className='text text_type_main-small text_color_inactive'>
					<FormattedDate date={new Date(order.createdAt)} />
				</span>
				<div className={styles.totalPrice}>
					<span className='text text_type_digits-default mr-2'>
						{totalPrice}
					</span>
					<CurrencyIcon type='primary'></CurrencyIcon>
				</div>
			</div>
		</div>
	);
};
