import React from 'react';
import styles from './burger-constructor.module.scss';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';
import { BurgerConstructorFooter } from './burger-cosntructor-footer/burger-constructor-footer';
import { ingredientTypes } from '../utils/ingredient-types';
import { arrayOf, func } from 'prop-types';

//const selectedBun = '60666c42cc7b410027a1a9b1';
//const selectedBun = '60666c42cc7b410027a1a9b2';
const selectedBun = '643d69a5c3f7b9001cfa093c';

export const BurgerConstructor = ({ ingredientsData, openModal }) => {
	const bun = ingredientsData.find((element) => element._id === selectedBun);
	const sum = 500;
	return (
		<section className={styles.constructor + ' mt-25 ml-10 mr-4'}>
			<ul className={styles.list}>
				<BurgerConstructorItem item={bun} type='top' />
			</ul>
			<div className={styles.ingredientsList}>
				<ul className={styles.list}>
					{ingredientsData
						.filter((item) => item.type !== 'bun')
						.map((elem) => {
							return <BurgerConstructorItem key={elem._id} item={elem} />;
						})}
				</ul>
			</div>
			<ul className={styles.list + ' mb-6'}>
				<BurgerConstructorItem item={bun} type='bottom' />
			</ul>
			<BurgerConstructorFooter sum={sum} openModal={openModal} />
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredientsData: arrayOf(ingredientTypes).isRequired,
	openModal: func.isRequired,
};
