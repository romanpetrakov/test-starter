import styles from './burger-constructor.module.scss';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';
import { BurgerConstructorFooter } from './burger-cosntructor-footer/burger-constructor-footer';

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
		<section className={styles.section + ' mt-25'} ref={dropRef}>
			<div className={styles.bunList + ' ml-8 mb-4'}>
				<BurgerConstructorItem item={bun} type='top' />
			</div>
			<div
				className={
					(ingredients.length == 0 ? styles.emptyList : styles.list) + ' ml-8'
				}
				ref={ref}>
				{ingredients.length > 0 ? (
					ingredients
						.filter((item: TIngredient) => item.type !== 'bun')
						.map((elem: TIngredient, index: number) => {
							return (
								<BurgerConstructorItem
									key={elem.uniqueId}
									item={elem}
									uuid={elem.uniqueId}
									indexInArray={index}
									moveIngredient={moveIngredient}
								/>
							);
						})
				) : (
					<BurgerConstructorItem />
				)}
			</div>
			<div className={styles.bun + ' ml-8'}>
				<BurgerConstructorItem item={bun} type='bottom' />
			</div>
			<BurgerConstructorFooter />
		</section>
	);
};
