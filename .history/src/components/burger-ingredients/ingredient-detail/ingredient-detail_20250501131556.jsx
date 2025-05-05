import { useDispatch } from 'react-redux';
import styles from './ingredient-detail.module.scss';

import { useSelector } from 'react-redux';
import { setIngredient } from '../../../services/ingredient/action';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const IngredientDetail = () => {

	const { id } = useParams();
	const {ingredient} = useSelector((state) => state.ingredient.ingredient);
	console.log(ingredient);
    const {ingredients} = useSelector(state => state.ingredients.ingredients)
	console.log(ingredients);

	const dispatch = useDispatch();
//	dispatch(setIngredient(id));

	const selectedIngredient = ingredient;

    useEffect(() => {
		selectedIngredient = ingredient ?? ingredients?.find((item) => item._id === id);
    }, [ingredient, ingredients]);


	return ( ingredient &&
		<div className={styles.ingredient}>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				className={'mb-4'}
			/>
			<span className={`text text_type_main-medium mb-8 ${styles.name}`}>
				{ingredient.name}
			</span>
			<ul className={styles.list + ' mb-15'}>
				<li className={styles.list_item + ' mr-5 text_color_inactive'}>
					<p className='text text_type_main-default'>Калории,ккал</p>
					<span className={'text text_type_main-default'}>
						{ingredient.calories}
					</span>
				</li>
				<li className={styles.list_item + ' mr-5 text_color_inactive'}>
					<p className='text text_type_main-default'>Белки, г</p>
					<span className='text text_type_digits-default'>
						{ingredient.proteins}
					</span>
				</li>
				<li className={styles.list_item + ' mr-5 text_color_inactive'}>
					<p className='text text_type_main-default'>Жиры, г</p>
					<span className='text text_type_digits-default'>
						{ingredient.fat}
					</span>
				</li>
				<li className={styles.list_item + ' mr-5 text_color_inactive'}>
					<p className='text text_type_main-default'>Углеводы, г</p>
					<span className='text text_type_digits-default'>
						{ingredient.carbohydrates}
					</span>
				</li>
			</ul>
		</div>
	);
};
