import { FC } from 'react';
import NextImage from 'next/image';
import CheckMark from '@/components/common/CheckMark';

interface Props {
	src: string;
	selected?: boolean;
	onClick?(): void;
}

const Image: FC<Props> = ({ src, selected, onClick }): JSX.Element => {
	return (
		<div
			onClick={onClick}
			className='relative h-[200px] w-[200px] first-line:rounded overflow-hidden cursor-pointer'
		>
			<NextImage
				style={{ objectFit: 'cover' }}
				fill
				src={src}
				alt='gallery'
				className='bg-secondary-light hover:scale-110 transition'
			/>
			<div className='absolute top-2 left-2'>
				<CheckMark visible={selected || false} />
			</div>
		</div>
	);
};

export default Image;
