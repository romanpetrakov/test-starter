import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.scss';
import { FC, useMemo } from 'react';
import { setIngredient } from '../../../services/ingredient/action';

import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { TIngredient, TDragCollectedPropsWithOpacity } from '../../utils/types';

export const BurgerIngredient: FC<{ ingredient: TIngredient }> = ({
	ingredient,
}) => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const { bun, ingredients } = useAppSelector(
		(state) => state.selectedIngredients
	);

	const [{ isDragging }, dragRef] = useDrag<
		TIngredient,
		unknown,
		TDragCollectedPropsWithOpacity
	>(() => ({
		type: 'ingredient',
		item: { ...ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	}));

	const openModal = () => {
		dispatch(setIngredient(ingredient));
	};

	const countIngredient = useMemo<number>(() => {
		if (bun && ingredient._id === bun._id) {
			return 2;
		}

		return ingredients.filter(
			(elem: TIngredient) => elem._id === ingredient._id
		).length;
	}, [ingredients, bun, ingredient]);

	return (
		!isDragging && (
			<Link
				key={ingredient._id}
				to={'/ingredients/' + ingredient._id}
				state={{ backgroundLocation: location }}>
				<div
					className={styles.ingredient + ' ml-4 mb-6 mr-2'}
					onClick={openModal}
					aria-hidden='true'
					ref={dragRef}
					data-testid={'ingredient-' + ingredient._id}>
					<picture>
						<source srcSet={ingredient.image} type='image/svg+xml' />
						<img src={ingredient.image} alt={ingredient.name} />
					</picture>
					<p className={styles.price + ' pt-1 text text_type_digits-default'}>
						<span>{ingredient.price}</span>
						<CurrencyIcon className='pl-1' type='primary' />
					</p>
					<span className={styles.name + ' pt-1 text text_type_main-default'}>
						{ingredient.name}
					</span>
					<div data-testid='ingredient-counter'>
						<Counter count={countIngredient} size='default' extraClass='m-1' />
					</div>
				</div>
			</Link>
		)
	);
};
