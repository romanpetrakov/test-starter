import styles from './ingredient-details.module.less';

export function IngredientDetailsPage() {
	return (
		<div className={styles.container}>
					Детали ингредиента
				</div>
			</div>
			<div className='modal_body'>
				<IngredientDetailsComponent />
			</div>
		</div>
	);
}