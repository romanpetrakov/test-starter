import { FC } from 'react';
import style from './modal-overlay.module.scss';
import { TModalOverlayProps } from '../../utils/types';

export const ModalOverlay: FC<TModalOverlayProps> = ({ closeModal }) => {
	return (
		<div aria-hidden='true' className={style.overlay} onClick={closeModal} />
	);
};
