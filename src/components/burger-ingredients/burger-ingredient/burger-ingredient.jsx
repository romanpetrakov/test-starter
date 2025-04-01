import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { func } from 'prop-types';
import styles from './burger-ingredient.module.scss';
import { ingredientTypes } from '../../utils/ingredient-types';

export const BurgerIngredient = ({ item, openModal }) => {
	const handleClick = () => {
		openModal(item);
	};
	return (
		<div
			className={styles.ingredient + ' ml-4 mb-6 mr-2'}
			onClick={handleClick}
			aria-hidden='true'>
			<picture>
				<source srcSet={item.image} type='image/svg+xml' />
				<img src={item.image} alt={item.name} />
			</picture>
			<p className={styles.price + ' pt-1 text text_type_digits-default'}>
				<span>{item.price}</span>
				<CurrencyIcon className='pl-1' />
			</p>
			<span className={styles.name + ' pt-1 text text_type_main-default'}>
				{item.name}
			</span>
			<Counter count={1} size='default' extraClass='m-1' />
		</div>
	);
};

BurgerIngredient.propTypes = {
	item: ingredientTypes.isRequired,
	openModal: func.isRequired,
};
