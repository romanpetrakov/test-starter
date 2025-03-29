import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.scss';

export const BurgerIngredient = ({ item }) => {
	return (
		<div className={styles.ingredient + ' ml-4'}>
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
