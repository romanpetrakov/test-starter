import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import syles from './burger-ingredients-group.module.scss';

import { TIngredient, TGroup } from '../../utils/types';
import { FC } from 'react';

export const BurgerIngredientsGroup: FC<{
	groupItem: TGroup;
	ingredients: TIngredient[];
}> = ({ groupItem, ingredients }) => {
	return (
		<div className={syles.group}>
			<p className='text text_type_main-medium mb-6'>{groupItem.title}</p>
			{
				<div className={syles.items + ' ml-4 mb-2'}>
					{ingredients
						.filter((item: TIngredient) => item.type === groupItem.name)
						.map((elem: TIngredient) => {
							return <BurgerIngredient key={elem._id} ingredient={elem} />;
						})}
				</div>
			}
		</div>
	);
};
