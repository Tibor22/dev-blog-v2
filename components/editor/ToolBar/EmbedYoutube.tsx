import { FC, useState } from 'react';
import { BsYoutube } from 'react-icons/bs';
import Button from '../ToolBar/Button';

interface Props {
	onSubmit(link: string): void;
}

const EmbedYoutube: FC<Props> = ({ onSubmit }) => {
	const [url, setUrl] = useState('');
	const [visible, setVisible] = useState(false);
	const handleSubmit = () => {
		if (!url.trim()) return setVisible(false);
		onSubmit(url);
		setVisible(false);
	};
	return (
		<div
			onKeyDown={({ key }) => (key === 'Escape' ? setVisible(false) : '')}
			className='relative'
		>
			<Button onClick={() => setVisible(!visible)}>
				<BsYoutube />
			</Button>
			{visible && (
				<div className='absolute top-full mt-4 right-0 border-2 border-solid p-1 z-50'>
					<div className='flex items-center space-x-2'>
						<input
							onChange={(e) => setUrl(e.target.value)}
							value={url}
							autoFocus
							type='text'
							className='rounded bg-transparent focus:ring-0 focus:border-primary-dark dark:focus:border-primary transition dark:text-primary text-primary-dark p-2 text-sm outline-0'
							placeholder='https://youtube.com'
						/>
						<button
							onClick={handleSubmit}
							className='bg-action text-primary text-sm p-2 rounded'
						>
							Embed
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default EmbedYoutube;
