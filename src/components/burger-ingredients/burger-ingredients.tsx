import styles from './burger-ingredients.module.scss';

import { Tabs } from './tabs/tabs';

import { FC, useState } from 'react';
import { Ingredients } from './ingredients/ingredients';

export const BurgerIngredients: FC = () => {
	const [currentTab, setCurrentTab] = useState<string>('bun');
	return (
		<section className={styles.ingredients}>
			<p className={'mt-10 mb-5 text text_type_main-large'}>Соберите бургер</p>
			<Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
			<Ingredients setCurrentTab={setCurrentTab} />
		</section>
	);
};
