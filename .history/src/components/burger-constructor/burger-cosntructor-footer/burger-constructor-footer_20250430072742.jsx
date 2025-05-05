import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-footer.module.scss';
import { useMemo, useState } from 'react';
import { Modal } from '../../modal/modal';
import { Order } from '../../app/order-detail/order';
import { useSelector, useDispatch } from 'react-redux';
import { setOrder } from '../../../services/order/action';

export const BurgerConstructorFooter = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { ingredients, bun } = useSelector(
		(state) => state.selectedIngredients
	);
	const user = useSelector((store) => store.auth.user);
	const dispatch = useDispatch();

	const closeModal = () => {
		setIsModalVisible(false);
	};

	const openModal = () => {
		setIsModalVisible(true);
	};

	const handleClick = () => {
		if (!user) {
			return navigate('/login');
		}
		if (!bun) {
			alert('Нужно выбрать булку');
		} else if (bun && ingredients.length < 1) {
			alert('Нужно выбрать начинку');
		}
		if (bun && ingredients.length) {
			const ingredientsIds = ingredients.map((elem) => elem._id);
			ingredientsIds.unshift(bun._id);
			ingredientsIds.push(bun._id);
			const requestData = JSON.stringify({ ingredients: ingredientsIds });
			dispatch(setOrder(requestData));

			openModal();
		}
	};

	const sum = useMemo(() => {
		const bunPrice = bun ? bun.price : 0;
		const ingredientsPrice =
			ingredients.length > 0
				? ingredients.reduce((sum, elem) => (sum += elem.price), 0)
				: 0;
		return bunPrice * 2 + ingredientsPrice;
	}, [bun, ingredients]);

	return (
		<div className={styles.footer + ' mt-10 mr-4 pr-4'}>
			<p>
				<span className='text text_type_digits-medium mr-2'>{sum}</span>
				<CurrencyIcon type='primary' />
			</p>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				extraClass='ml-10'
				onClick={handleClick}>
				Оформить заказ
			</Button>
			{isModalVisible && (
				<Modal closeModal={closeModal} title='Детали ингредиента'>
					<Order />
				</Modal>
			)}
		</div>
	);
};
