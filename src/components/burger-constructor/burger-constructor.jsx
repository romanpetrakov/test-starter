import React from 'react';
import styles from './burger-constructor.module.scss';
import { ingredientsData } from '../utils/ingredients-data';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';
import { BurgerConstructorFooter } from './burger-cosntructor-footer/burger-constructor-footer';

//const selectedBun = '60666c42cc7b410027a1a9b1';
const selectedBun = '60666c42cc7b410027a1a9b2';

export const BurgerConstructor = () => {
	const bun = ingredientsData.find((element) => element._id === selectedBun);
	const sum = 500;
	return (
		<section className={styles.constructor + ' mt-25 ml-10 mr-10'}>
			<ul className={styles.list}>
				<BurgerConstructorItem item={bun} type='top' />
			</ul>
			<div className={styles.ingredients_list}>
				<ul className={styles.list}>
					{ingredientsData
						.filter((item) => item.type !== 'bun')
						.map((elem) => {
							return <BurgerConstructorItem key={elem._id} item={elem} />;
						})}
				</ul>
			</div>
			<ul className={styles.list}>
				<BurgerConstructorItem item={bun} type='bottom' />
			</ul>
			<BurgerConstructorFooter sum={sum} />
		</section>
	);
};
