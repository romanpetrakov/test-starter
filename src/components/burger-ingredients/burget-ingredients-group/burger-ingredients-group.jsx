import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import syles from './burger-ingredients-group.module.scss';

export const BurgerIngredientsGroup = ({ groupItem, ingredientsData }) => {
	return (
		<div className={syles.group}>
			<p className='text text_type_main-medium pb-6'>{groupItem.title}</p>
			<div className={syles.items + ' ml-4 pb-10'}>
				{ingredientsData
					.filter((item) => item.type === groupItem.name)
					.map((elem) => {
						return <BurgerIngredient key={elem._id} item={elem} />;
					})}
			</div>
		</div>
	);
};
