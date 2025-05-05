import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { ModalHeader } from './modal-header/modal-header';
import { element, func, string } from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.getElementById('react-modal');

export const Modal = ({ header, children, closeModal }) => {
	useEffect(() => {
		const clickKey = (e) => {
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

Modal.propTypes = {
	closeModal: func.isRequired,
	header: string,
	children: element
};
