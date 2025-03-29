import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import styles from './app.module.scss';

export const App = () => {
	return (
		<>
			<AppHeader />
			<main className={styles.page}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</>
	);
};
<div id='modal-content' />;
