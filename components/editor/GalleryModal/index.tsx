import ModalContainer, { ModalProps } from '@/components/common/ModalContainer';
import { FC } from 'react';

interface Props extends ModalProps {}

const GalleryModal: FC<Props> = ({ visible, onClose }): JSX.Element => {
	return (
		<ModalContainer visible onClose={onClose}>
			<div className='bg-black p-20'></div>
			<button className='bg-white p-3 absolute'>Click Me</button>
		</ModalContainer>
	);
};

export default GalleryModal;
