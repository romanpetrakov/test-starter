import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-footer.module.scss';
import { FC, useMemo, useState } from 'react';
import { Modal } from '../../modal/modal';
import { Order } from '../../order-detail/order';
import { setOrder } from '../../../services/order/action';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { TIngredient } from '../../utils/types';

export const BurgerConstructorFooter: FC = () => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const { ingredients, bun } = useAppSelector(
		(store) => store.selectedIngredients
	);
	const user = useAppSelector((store) => store.auth.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
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
			return;
		}
		if (ingredients.length < 1) {
			alert('Нужно выбрать начинку');
			return;
		}

		const ingredientsIds = ingredients.map((elem: TIngredient) => elem._id);
		ingredientsIds.unshift(bun._id); // Добавляем булку в начало
		ingredientsIds.push(bun._id); // Добавляем булку в конец

		dispatch(setOrder(ingredientsIds));
		openModal();
	};

	const sum = useMemo<number>(() => {
		const bunPrice = bun ? bun.price : 0;
		const ingredientsPrice =
			ingredients.length > 0
				? ingredients.reduce(
						(sum: number, elem: TIngredient) => (sum += elem.price),
						0
				  )
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
				<Modal closeModal={closeModal} header=''>
					<Order />
				</Modal>
			)}
		</div>
	);
};
