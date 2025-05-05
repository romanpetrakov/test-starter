import styles from './ingredient-details.module.scss';

export function IngredientDetailsPage() {
	return (
		<div className={styles.container}>
					Детали ингредиента
			<div className='modal_body'>
				<IngredientDetail />
			</div>
		</div>
	);
}