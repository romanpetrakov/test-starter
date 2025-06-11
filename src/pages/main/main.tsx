import styles from './main.module.scss';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../hooks/hooks';
import { FC } from 'react';

export const MainPage: FC = () => {
	const { ingredients, ingredientsFetching, ingredientsFailedFetching } =
		useAppSelector((state) => state.ingredients);
	return (
		<DndProvider backend={HTML5Backend}>
			{ingredientsFetching && <main>Загрузка...</main>}
			{ingredientsFailedFetching && <main>Произошла ошибка</main>}
			{!ingredientsFetching &&
				!ingredientsFailedFetching &&
				!!ingredients &&
				ingredients.length > 0 && (
					<main className={styles.page}>
						<BurgerIngredients />
						<BurgerConstructor />
					</main>
				)}
		</DndProvider>
	);
};
