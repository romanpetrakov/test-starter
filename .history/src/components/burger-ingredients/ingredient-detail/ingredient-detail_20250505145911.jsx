import styles from './ingredient-detail.module.scss';

import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const IngredientDetail = () => {
	const { id } = useParams();
	const { ingredient } = useSelector((store) => store.ingredient);
	const { ingredients } = useSelector((store) => store.ingredients);
	[selectedIngredient, setSelectedIngredient] = useState()
	const selectedIngredient =
		ingredient ?? ingredients
			? ingredients.find((item) => item._id === id)
			: null;

	useEffect(() => {
		selectedIngredient = ingredients?.find((item) => item._id === id);
	}, [ingredients]);

	return (
		selectedIngredient && (
			<div className={styles.ingredient}>
				<img
					src={selectedIngredient.image_large}
					alt={selectedIngredient.name}
					className={'mb-4'}
				/>
				<span className={`text text_type_main-medium mb-8 ${styles.name}`}>
					{selectedIngredient.name}
				</span>
				<ul className={styles.list + ' mb-15'}>
					<li className={styles.list_item + ' mr-5 text_color_inactive'}>
						<p className='text text_type_main-default'>Калории,ккал</p>
						<span className={'text text_type_main-default'}>
							{selectedIngredient.calories}
						</span>
					</li>
					<li className={styles.list_item + ' mr-5 text_color_inactive'}>
						<p className='text text_type_main-default'>Белки, г</p>
						<span className='text text_type_digits-default'>
							{selectedIngredient.proteins}
						</span>
					</li>
					<li className={styles.list_item + ' mr-5 text_color_inactive'}>
						<p className='text text_type_main-default'>Жиры, г</p>
						<span className='text text_type_digits-default'>
							{selectedIngredient.fat}
						</span>
					</li>
					<li className={styles.list_item + ' mr-5 text_color_inactive'}>
						<p className='text text_type_main-default'>Углеводы, г</p>
						<span className='text text_type_digits-default'>
							{selectedIngredient.carbohydrates}
						</span>
					</li>
				</ul>
			</div>
		)
	);
};
