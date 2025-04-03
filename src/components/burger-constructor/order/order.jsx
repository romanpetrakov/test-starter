import styles from './order.module.scss';
import image from '../../../img/order.svg';

export const Order = () => {
	const number = '034536';
	return (
		<div className={styles.order + ' mt-5 mr-10'}>
			<span className='text text_type_digits-large mb-8'>{number}</span>
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
		</div>
	);
};
