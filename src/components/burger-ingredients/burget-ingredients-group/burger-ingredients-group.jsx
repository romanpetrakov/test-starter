import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import syles from './burger-ingredients-group.module.scss';
import { arrayOf } from 'prop-types';
import { groupTypes, ingredientTypes } from '../../utils/ingredient-types';

export const BurgerIngredientsGroup = ({ groupItem, ingredients }) => {
	return (
		<div className={syles.group}>
			<p className='text text_type_main-medium mb-6'>{groupItem.title}</p>
			{
				<div className={syles.items + ' ml-4 mb-2'}>
					{ingredients
						.filter((item) => item.type === groupItem.name)
						.map((elem) => {
							return <BurgerIngredient key={elem._id} ingredient={elem} />;
						})}
				</div>
			}
		</div>
	);
};
BurgerIngredientsGroup.propTypes = {
	groupItem: groupTypes.isRequired,
	ingredients: arrayOf(ingredientTypes).isRequired,
};
