import { IngredientDetail } from '../../components/burger-ingredients/ingredient-detail/ingredient-detail';
import style from './ingredient-details.module.scss';

export const IngredientDetailsPage = () => {
	return (
		<div className={style.container }>1111
		  <Outlet />
		</div>
	  );

	return (
		<div className={style.container + ' mt-15 pt-30 '}>
			<div className='modal_header'>
				<div className='text text_type_main-large mb-10'>
					Детали ингредиента
				</div>
			</div>
			<div className='modal_body'>
			 <IngredientDetail />
			</div>
		</div>
	);
}