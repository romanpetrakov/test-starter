import styles from './burger-constructor.module.scss';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';
import { BurgerConstructorFooter } from './burger-cosntructor-footer/burger-constructor-footer';

import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import {
	setBun,
	addItem,
	changeOrder,
} from '../../services/selected-ingredients/action';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';

export const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const { bun, ingredients } = useSelector(
		(state) => state.selectedIngredients
	);
	// const { order } = useSelector((state) => state.order);
	const ref = useRef(null);

	const moveIngredient = (dragIndex, hoverIndex) => {
		const newIngredients = [...ingredients];
		const movedItem = ingredients[dragIndex];
		newIngredients.splice(dragIndex, 1);
		newIngredients.splice(hoverIndex, 0, movedItem);
		console.log(newIngredients);
		dispatch(changeOrder(newIngredients));
	};

	const [, dropRef] = useDrop({
		accept: 'ingredient',
		drop(itemId) {
			addIngredient(itemId);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const addIngredient = (ingredient) => {
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
						.filter((item) => item.type !== 'bun')
						.map((elem, index) => {
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
