import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import syles from './burger-ingredients-group.module.scss';
import { arrayOf, func } from 'prop-types';
import { groupTypes, ingredientTypes } from '../../utils/ingredient-types';

export const BurgerIngredientsGroup = ({
	groupItem,
	ingredientsData,
	openModal,
}) => {
	return (
		<div className={syles.group}>
			<p className='text text_type_main-medium mb-6'>{groupItem.title}</p>
			<div className={syles.items + ' ml-4 mb-2'}>
				{ingredientsData
					.filter((item) => item.type === groupItem.name)
					.map((elem) => {
						return (
							<BurgerIngredient
								key={elem._id}
								item={elem}
								openModal={openModal}
							/>
						);
					})}
			</div>
		</div>
	);
};
BurgerIngredientsGroup.propTypes = {
	groupItem: groupTypes.isRequired,
	ingredientsData: arrayOf(ingredientTypes).isRequired,
	openModal: func.isRequired,
};
