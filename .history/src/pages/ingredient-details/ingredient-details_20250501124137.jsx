import { IngredientDetail } from '../../components/burger-ingredients/ingredient-detail/ingredient-detail';
import styles from './ingredient-details.module.scss';

export function IngredientDetailsPage() {
	return (
		<div className={styles.container + ' mt-15 pt-30 '}>
					Детали ингредиента
			<div className='modal_body'>
				<IngredientDetail />
			</div>
		</div>
	);
}