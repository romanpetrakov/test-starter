import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
//import { Modal } from '../../modal/modal';
// import React from 'react';
import styles from './burger-constructor-footer.module.scss';

export const BurgerConstructorFooter = ({ sum }) => {
	// const [visible, setVisible] = useState(false);
	// const toggleModal = () => {
	// 	setVisible(!visible);
	// };
	// const modal = (
	// 	<Modal
	// 		header='Внимание!'
	// 		onClose={() => toggleModal()}
	// 		children='<p>Спасибо за внимание!<p>'
	// 	/>
	// );

	return (
		<div className={styles.footer + ' mt-10'}>
			<p className='mr-10'>
				<span className='text text_type_digits-medium mr-1'>{sum}</span>
				<CurrencyIcon type='primary' />
			</p>
			<Button
				htmlType='button'
				type='primary'
				size='small'
				extraClass='ml-2'
				// onClick={() => toggleModal()}
			>
				Оформить заказ
			</Button>
			{/* {visible && modal} */}
		</div>
	);
};
