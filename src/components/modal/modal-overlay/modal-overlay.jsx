import style from './modal-overlay.module.scss';
import { func } from 'prop-types';

export const ModalOverlay = ({ closeModal }) => {
	return (
		<div aria-hidden='true' className={style.overlay} onClick={closeModal} />
	);
};

ModalOverlay.propTypes = {
	closeModal: func,
};
