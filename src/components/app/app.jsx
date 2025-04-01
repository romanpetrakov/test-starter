import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { Order } from '../burger-constructor/order/order';
import { IngredientDetail } from '../burger-ingredients/ingredient-detail/ingredient-detail';
import { useState, useEffect } from 'react';
import { Modal } from '../modal/modal';

import styles from './app.module.scss';

const url = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
	const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
	const [isIngredientModalVisible, setIsIngredientModalVisible] =
		useState(false);
	const [ingredientDetails, setIngredientDetails] = useState(false);

	const [state, setState] = useState({
		isLoading: false,
		hasError: false,
		ingredientsData: [],
	});

	useEffect((state) => {
		setState({ ...state, hasError: false, isLoading: true });
		fetch(url)
			.then((res) => res.json())
			.then((data) =>
				setState({ ...state, ingredientsData: data.data, isLoading: false })
			)
			.catch((error) => {
				console.error('error:' + error);
				setState({ ...state, isLoading: false, hasError: true });
			});
	}, []);

	const closeOrderModal = () => {
		setIsOrderModalVisible(false);
	};

	const openOrderModal = () => {
		setIsOrderModalVisible(true);
	};

	const closeIngredientModal = () => {
		setIsIngredientModalVisible(false);
	};

	const openIngredientModal = (ingredient) => {
		setIngredientDetails(ingredient);
		setIsIngredientModalVisible(true);
	};

	return (
		<>
			<AppHeader />
			{state.isLoading && <main>Загрузка...</main>}
			{state.hasError && <main>Произошла ошибка</main>}
			{!state.isLoading && !state.hasError && state.ingredientsData.length && (
				<main className={styles.page}>
					<BurgerIngredients
						ingredientsData={state.ingredientsData}
						openModal={openIngredientModal}
					/>
					<BurgerConstructor
						ingredientsData={state.ingredientsData}
						openModal={openOrderModal}
					/>
				</main>
			)}
			{isOrderModalVisible && (
				<Modal header='' closeModal={closeOrderModal}>
					<Order />
				</Modal>
			)}
			{isIngredientModalVisible && (
				<Modal header='Детали ингредиента' closeModal={closeIngredientModal}>
					<IngredientDetail ingredient={ingredientDetails} />
				</Modal>
			)}
		</>
	);
};
