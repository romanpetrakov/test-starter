import { getIngredients } from "../../services/ingredients/action";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from './main.module.scss';
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function MainPage() {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	const { ingredients, loading, error } = useSelector(
		(state) => state.ingredients
	);

    return (
        <DndProvider backend={HTML5Backend}>
			{loading && <main>Загрузка...</main>}
			{error && <main>Произошла ошибка</main>}
			{!loading && !error && !!ingredients && ingredients.length > 0 && (
				<main className={styles.page}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			)}
        </DndProvider>
    )
}