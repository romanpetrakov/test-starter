import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor-item.module.css';

export const BurgerConstructorItem = ({ item, type }) => {
	const itemName = (item, type) => {
		if (item.type !== 'bun') {
			return item.name;
		}

		return item.name + ' (' + (type == 'top' ? 'верх' : 'низ') + ')';
	};

	return (
		<li className={style.item + ' mt-4 mb-4 ml-6 pl-8 pr-8'}>
			<ConstructorElement
				type={item.type === 'bun' && type}
				isLocked={item.type === 'bun'}
				text={itemName(item, type)}
				price={item.price}
				thumbnail={item.image}
			/>
		</li>
	);
};
