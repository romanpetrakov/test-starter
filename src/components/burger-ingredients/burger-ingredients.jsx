import styles from './burger-ingredients.module.scss';

import { Tabs } from './tabs/tabs';

import { useState } from 'react';
import { Ingredients } from './ingredients/ingredients';

export const BurgerIngredients = () => {
	const [currentTab, setCurrentTab] = useState('bun');
	return (
		<section className={styles.ingredients}>
			<p className={'mt-10 mb-5 text text_type_main-large'}>Соберите бургер</p>
			<Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
			<Ingredients setCurrentTab={setCurrentTab} />
		</section>
	);
};
