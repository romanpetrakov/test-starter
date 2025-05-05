import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.scss';
import { ingredientTypes } from '../../utils/ingredient-types';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setIngredient,
	removeIngredient,
} from '../../../services/ingredient/action';
import { Modal } from '../../modal/modal';
import { IngredientDetail } from '../ingredient-detail/ingredient-detail';
import { useDrag } from 'react-dnd';

export const BurgerIngredient = ({ ingredient }) => {
	const dispatch = useDispatch();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { bun, ingredients } = useSelector(
		(state) => state.selectedIngredients
	);

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: 'ingredient',
		item: { ...ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			//            handlerId: monitor.getHandlerId(),
		}),
	}));

	const opacity = isDragging ? 0.4 : 1;

	const closeModal = () => {
		dispatch(removeIngredient());
		setIsModalVisible(false);
	};
	const openModal = () => {
		dispatch(setIngredient(ingredient));
		setIsModalVisible(true);
	};

	const countIngredient = useMemo(() => {
		if (bun && ingredient._id === bun._id) {
			return 2;
		}

		return ingredients.filter((elem) => elem._id === ingredient._id).length;
	}, [ingredients, bun, ingredient]);

	return (
		!isDragging && (
			<Link key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{backgroundLocation: location}}>
				<div
					className={styles.ingredient + ' ml-4 mb-6 mr-2'}
					onClick={openModal}
					aria-hidden='true'
					ref={dragRef}
					opacity={opacity}>
					<picture>
						<source srcSet={ingredient.image} type='image/svg+xml' />
						<img src={ingredient.image} alt={ingredient.name} />
					</picture>
					<p className={styles.price + ' pt-1 text text_type_digits-default'}>
						<span>{ingredient.price}</span>
						<CurrencyIcon className='pl-1' />
					</p>
					<span className={styles.name + ' pt-1 text text_type_main-default'}>
						{ingredient.name}
					</span>
					<Counter count={countIngredient} size='default' extraClass='m-1' />
				</div>
				{isModalVisible && (
					<Modal header='Детали ингредиента' closeModal={closeModal}>
						<IngredientDetail />
					</Modal>
				)}
			</Link>
		)
	);
};

BurgerIngredient.propTypes = {
	ingredient: ingredientTypes.isRequired,
};
