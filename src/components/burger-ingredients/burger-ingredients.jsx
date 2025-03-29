import styles from './burger-ingredients.module.scss';
import { BurgerIngredientsGroup } from './burget-ingredients-group/burger-ingredients-group';
import { ingredientGroupsData } from './../utils/ingredient-groups-data';

import { Tabs } from './tabs/tabs';

export const BurgerIngredients = () => {
	return (
		<section className={styles.ingredients}>
			<p className={'pt-10 pb-5 text text_type_main-large'}>Соберите бургер</p>
			<Tabs />
			<div className={styles.groups}>
				{ingredientGroupsData.map((item, key) => (
					<BurgerIngredientsGroup key={key} name={item.type} groupItem={item} />
				))}
			</div>
		</section>
	);
};
