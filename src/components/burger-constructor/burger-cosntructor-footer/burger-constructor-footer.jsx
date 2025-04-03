import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-footer.module.scss';
import { func, number } from 'prop-types';

export const BurgerConstructorFooter = ({ sum, openModal }) => {
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
				onClick={openModal}>
				Оформить заказ
			</Button>
		</div>
	);
};

BurgerConstructorFooter.propTypes = {
	sum: number.isRequired,
	openModal: func.isRequired,
};
