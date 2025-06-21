import styles from './burger-constructor.module.scss';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';
import { BurgerConstructorFooter } from './burger-constructor-footer/burger-constructor-footer';

import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { FC, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import {
	setBun,
	addItem,
	changeOrder,
} from '../../services/selected-ingredients/action';

import { TConstructorDropCollectedProps, TIngredient } from '../utils/types';

export const BurgerConstructor: FC = () => {
	const dispatch = useAppDispatch();
	const { bun, ingredients } = useAppSelector(
		(state) => state.selectedIngredients
	);

	const ref = useRef<HTMLDivElement>(null);

	const moveIngredient = (dragIndex: number, hoverIndex: number) => {
		const newIngredients = [...ingredients];
		const movedItem = ingredients[dragIndex];
		newIngredients.splice(dragIndex, 1);
		newIngredients.splice(hoverIndex, 0, movedItem);

		dispatch(changeOrder(newIngredients));
	};

	const [, dropRef] = useDrop<
		TIngredient,
		void,
		TConstructorDropCollectedProps
	>({
		accept: 'ingredient',
		drop(itemId) {
			addIngredient(itemId);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const addIngredient = (ingredient: TIngredient) => {
		const item = {
			...ingredient,
			uniqueId: uuidv4(),
		};

		if (ingredient.type === 'bun') {
			dispatch(setBun(item));
		} else {
			dispatch(addItem(item));
		}
	};

	return (
		<section
			className={styles.section + ' mt-25'}
			ref={dropRef}
			data-testid='constructor-area'>
			{/* Верхняя булка */}
			<div
				className={styles.bunList + ' ml-8 mb-4'}
				data-testid='constructor-bun-top'>
				<BurgerConstructorItem item={bun} type='top' />
			</div>

			{/* Начинки и соусы */}
			<div
				className={
					(ingredients.length == 0 ? styles.emptyList : styles.list) + ' ml-8'
				}
				ref={ref}>
				{ingredients.length > 0 ? (
					ingredients
						.filter((item: TIngredient) => item.type !== 'bun')
						.map((elem: TIngredient, index: number) => (
							<BurgerConstructorItem
								key={elem.uniqueId}
								item={elem}
								uuid={elem.uniqueId}
								indexInArray={index}
								moveIngredient={moveIngredient}
								data-testid={`filling-item-${index}`}
							/>
						))
				) : (
					<BurgerConstructorItem data-testid='empty-constructor-placeholder' />
				)}
			</div>

			{/* Нижняя булка */}
			<div
				className={styles.bun + ' ml-8'}
				data-testid='constructor-bun-bottom'>
				<BurgerConstructorItem item={bun} type='bottom' />
			</div>

			{/* Футер с кнопкой заказа */}
			<BurgerConstructorFooter data-testid='constructor-footer' />
		</section>
	);
};
