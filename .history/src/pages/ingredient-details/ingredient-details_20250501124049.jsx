import styles from './ingredient-details.module.sess';

export function IngredientDetailsPage() {
	return (
		<div className={styles.container}>
					Детали ингредиента
			<div className='modal_body'>
				<IngredientDetailsComponent />
			</div>
		</div>
	);
}