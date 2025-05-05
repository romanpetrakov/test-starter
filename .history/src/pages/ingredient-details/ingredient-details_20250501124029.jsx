import styles from './ingredient-details.module.less';

export function IngredientDetailsPage() {
	return (
		<div className={styles.container}>
			<div className='modal_header'>
				<div className='text text_type_main-large mb-10'>
					Детали ингредиента
				</div>
			</div>
			<div className='modal_body'>
				<IngredientDetailsComponent />
			</div>
		</div>
	);
}