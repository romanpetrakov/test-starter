import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal-header.module.scss';

import { string, func } from 'prop-types';

export const ModalHeader = ({ header, closeModal }) => {
	return (
		<div className={styles.header}>
			<p className='ml-10 mt-10 text text_type_main-large'>{header}</p>
			<CloseIcon
				type='primary'
				className={styles.close + ' mt-15 mr-10'}
				onClick={closeModal}
			/>
		</div>
	);
};

ModalHeader.propTypes = {
	header: string,
	closeModal: func.isRequired,
};
