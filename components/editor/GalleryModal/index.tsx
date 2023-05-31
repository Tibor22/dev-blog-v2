import ModalContainer, { ModalProps } from '@/components/common/ModalContainer';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import Gallery from './Gallery';
import Image from 'next/image';
import ActionButton from '@/components/common/ActionButton';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export interface ImageSelectionResult {
	src: string;
	altText: string;
}

interface Props extends ModalProps {
	onFileSelect(image: File): void;
	onSelect(result: ImageSelectionResult): void;
	images: { src: string }[];
	uploading?: boolean;
}

const GalleryModal: FC<Props> = ({
	images,
	visible,
	onFileSelect,
	onSelect,
	onClose,
	uploading,
}): JSX.Element => {
	const [selectedImage, setSelectedImage] = useState('');
	const [altText, setAltText] = useState('');

	const handleClose = useCallback(() => {
		onClose && onClose();
	}, [onClose]);

	const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
		target,
	}) => {
		const { files } = target;
		if (!files) return;

		const file = files[0];
		if (!file.type.startsWith('image')) return onClose && onClose();

		onFileSelect(file);
	};

	const handleSelection = () => {
		if (!selectedImage) return handleClose();
		onSelect({ src: selectedImage, altText: altText });
		handleClose();
	};
	return (
		<ModalContainer visible onClose={onClose}>
			<div className='max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded'>
				<div className='flex'>
					<div className='basis-[75%] max-h-[450px] overflow-y-auto custom-scroll-bar'>
						<Gallery
							images={images}
							onSelect={(src) => setSelectedImage(src)}
							selectedImage={selectedImage}
							uploading={uploading}
						/>
					</div>
					<div className='basis-1/4 px-2'>
						<div className='space-y-4'>
							<div className='div'>
								<input
									onChange={handleOnImageChange}
									hidden
									type='file'
									id='image-input'
								/>
								<label htmlFor='image-input'>
									<div className='w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded'>
										<AiOutlineCloudUpload />
										<span> Upload Image</span>
									</div>
								</label>
							</div>
							{selectedImage.length > 0 && (
								<>
									<textarea
										className='resize-none w-full rounded bg-secondary-dark focus:ring-1 focus:border-secondary-dark text-primary dark:text-primary-dark h-32 p-1 placeholder-white placeholder-opacity-75'
										placeholder='Alt text'
										value={altText}
										onChange={({ target }) => setAltText(target.value)}
									></textarea>
									<ActionButton onClick={handleSelection} title='Select' />
									<div className='relative aspect-video'>
										<Image
											alt='selected image'
											src={selectedImage}
											fill
											style={{ objectFit: 'contain' }}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</ModalContainer>
	);
};

export default GalleryModal;
