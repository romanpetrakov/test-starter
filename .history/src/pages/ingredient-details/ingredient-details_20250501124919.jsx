import { IngredientDetail } from '../../components/burger-ingredients/ingredient-detail/ingredient-detail';
import styles from './ingredient-details.module.scss';

export function IngredientDetailsPage() {
	return (
		<div className={styles.container + ' mt-15 pt-30 '}>
			<h1 className="text text_type_main-medium mb-6">Детали ингредиента</h1>

			<div className="mb-8">
				<IngredientDetail />
			</div>
		</div>
	);
}