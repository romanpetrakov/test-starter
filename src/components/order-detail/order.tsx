import styles from './order.module.scss';
import image from '../../img/order.svg';
import { useAppSelector } from '../../hooks/hooks';
import { FC } from 'react';
export const Order: FC = () => {
	const { order, requestInProgress, sendOrderFailed } = useAppSelector(
		(state) => state.order
	);

	return (
		<div className={styles.order + ' mt-5 mr-10'}>
			{requestInProgress ? (
				<span className='text text_type_main-medium'>Заказ обрабатывается</span>
			) : sendOrderFailed ? (
				<span className='text text_type_main-medium'>Произошла ошибка</span>
			) : order ? (
				<>
					<span className='text text_type_digits-large mb-8'>
						{order.number}
					</span>
					<span className='text text_type_main-medium mb-15'>
						идентификатор заказа
					</span>
					<img src={image} alt='готовится' className={styles.img + ' mb-15'} />
					<span className='text text_type_main-default mb-2'>
						Ваш заказ начали готовить
					</span>
					<span className='text text_type_main-default text_color_inactive mb-30'>
						Дождитесь готовности на орбитальной станции
					</span>
				</>
			) : (
				<span className='text text_type_main-medium'>...</span>
			)}
		</div>
	);
};
