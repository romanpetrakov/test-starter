import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { ModalHeader } from './modal-header/modal-header';
import { FC, useEffect } from 'react';
import { TModalProps } from '../utils/types';

const modalRoot = document.getElementById('react-modal') as HTMLElement;

export const Modal: FC<TModalProps> = ({ header, children, closeModal }) => {
	useEffect(() => {
		const clickKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};

		document.addEventListener('keydown', clickKey, false);

		return () => {
			document.removeEventListener('keydown', clickKey, false);
		};
	}, [closeModal]);

	return createPortal(
		<div>
			<ModalOverlay closeModal={closeModal} />
			<div className={styles.modal}>
				<ModalHeader closeModal={closeModal} header={header} />
				{children}
			</div>
		</div>,
		modalRoot
	);
};
