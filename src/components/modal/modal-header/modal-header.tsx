import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal-header.module.scss';

import { TModalHeaderProps } from '../../utils/types';
import { FC } from 'react';

export const ModalHeader: FC<TModalHeaderProps> = ({ header, closeModal }) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			closeModal();
		}
	};
	return (
		<div className={styles.header}>
			<p className='ml-10 mt-10 text text_type_main-large'>{header}</p>
			<div
				onClick={closeModal}
				onKeyDown={handleKeyDown}
				tabIndex={0}
				role='button'
				data-testid='close-button'>
				<CloseIcon
					type='primary'
					className={styles.close + ' mt-15 mr-10'}
					onClick={closeModal}
				/>
			</div>
		</div>
	);
};
