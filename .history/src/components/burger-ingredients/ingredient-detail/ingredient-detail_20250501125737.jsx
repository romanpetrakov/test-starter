import { useDispatch } from 'react-redux';
import styles from './ingredient-detail.module.scss';

import { useSelector } from 'react-redux';
import { setIngredient } from '../../../services/ingredient/action';
import { useParams } from 'react-router-dom';

export const IngredientDetail = () => {

	const { id } = useParams();

	const dispatch = useDispatch()

	const {ingredient, showModal] = useSelector((state) => state.ingredientDetail.ingredientDetail)
    const ingredientsList = useSelector(state => state.ingredients.ingridientList)

	if (!)

    const { ingridientsFetching, ingridientsSuccessFetching, ingridientsFailedFetching } = useSelector(state => {
        return {
            ingridientsFetching: state.ingredients.ingridientsFetching,
            ingridientsSuccessFetching: state.ingredients.ingridientsSuccessFetching,
            ingridientsFailedFetching: state.ingredients.ingridientsFailedFetching,
        }

    })




    useEffect(() => {
        if (ingridientsSuccessFetching && !selectedIngredient) {
            let ingredientById = ingredientsList.find(item => item._id === id);
            dispatch({ type: SHOW_INGREDIENT_DETAILS, ingredientDetail: ingredientById })
        }
    }, [ingridientsFetching, ingridientsSuccessFetching, ingridientsFailedFetching, ingredientsList, selectedIngredient])


    if (ingridientsFetching) {
        return (<p>Красивая анимация загрузки</p>)
    }

    else if (ingridientsSuccessFetching && selectedIngredient) {
	const dispatch = useDispatch();


	dispatch(setIngredient(id));
	const ingredient = useSelector((store) => store.ingredient.ingredient);
	return (
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
