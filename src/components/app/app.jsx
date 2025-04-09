import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { useEffect } from 'react';

import { getIngredients } from '../../services/ingredients/action';
import { useDispatch, useSelector } from 'react-redux';

import styles from './app.module.scss';

export const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	const { ingredients, loading, error } = useSelector(
		(state) => state.ingredients
	);

	return (
		<>
			<AppHeader />
			{loading && <main>Загрузка...</main>}
			{error && <main>Произошла ошибка</main>}
			{!loading && !error && !!ingredients && ingredients.length > 0 && (
				<main className={styles.page}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			)}
		</>
	);
};
