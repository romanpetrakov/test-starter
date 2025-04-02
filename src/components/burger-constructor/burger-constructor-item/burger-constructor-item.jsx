import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor-item.module.css';
import { ingredientTypes } from '../../utils/ingredient-types';
import { string } from 'prop-types';
export const BurgerConstructorItem = ({ item, type }) => {
	if (item.type !== 'bun') {
		return (
			<li className={style.item + ' mb-4 ml-8'}>
				<ConstructorElement
					text={item.name}
					price={item.price}
					thumbnail={item.image}
					extraClass='pl-6 pt-4 pb-4 pr-8'
				/>
			</li>
		);
	}
	return (
		<li className={style.item + (type == 'top' ? ' mb-4' : '') + ' ml-8'}>
			<ConstructorElement
				type={item.type === 'bun' && type}
				isLocked={item.type === 'bun'}
				text={item.name + ' (' + (type == 'top' ? 'верх' : 'низ') + ')'}
				price={item.price}
				thumbnail={item.image}
				extraClass='pl-6 pt-4 pb-4 pr-8'
			/>
		</li>
	);
};

BurgerConstructorItem.propTypes = {
	item: ingredientTypes.isRequired,
	type: string,
};
