import styles from './burger-ingredients.module.scss';
import { BurgerIngredientsGroup } from './burget-ingredients-group/burger-ingredients-group';
import { ingredientGroupsData } from '../utils/ingredient-groups-data';
import { ingredientTypes } from '../utils/ingredient-types';
import { arrayOf, func } from 'prop-types';

import { Tabs } from './tabs/tabs';

export const BurgerIngredients = ({ ingredientsData, openModal }) => {
	return (
		<section className={styles.ingredients}>
			<p className={'mt-10 mb-5 text text_type_main-large'}>Соберите бургер</p>
			<Tabs />
			<div className={styles.groups}>
				{ingredientGroupsData.map((item, key) => (
					<BurgerIngredientsGroup
						key={key}
						groupItem={item}
						ingredientsData={ingredientsData}
						openModal={openModal}
					/>
				))}
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredientsData: arrayOf(ingredientTypes).isRequired,
	openModal: func.isRequired,
};
