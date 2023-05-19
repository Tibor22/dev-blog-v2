import { FC, useState } from 'react';
import { validateUrl } from '../EditorUtils';

interface Props {
	visible: boolean;
	initialState?: { url: string; openInNewTab: boolean };
	onSubmit(link: linkOption): void;
	onRemove?(): void;
}

export type linkOption = {
	url: string;
	openInNewTab: boolean;
};

const defaultLink = {
	url: '',
	openInNewTab: false,
};

const LinkForm: FC<Props> = ({
	visible,
	initialState,
	onRemove,
	onSubmit,
}): JSX.Element | null => {
	const [url, setUrl] = useState('');
	const [openInNewTab, setOpenInNewTab] = useState(false);
	const [link, setLink] = useState<linkOption>(defaultLink);

	if (!visible) return null;

	const handleSubmit = (e: any) => {
		validateUrl(link.url);
		onSubmit({ ...link, url: validateUrl(link.url) });
		setLink(defaultLink);
	};

	console.log('LINK:', link);

	return (
		<div className='rounded text-left bg-primary dark:bg-primary-dark animate-reveal z-50 dark:shadow-secondary-dark shadow-md p-2'>
			<div className='flex items-center space-x-2'>
				<input
					onChange={(e) =>
						setLink((prevLink) => {
							return { ...prevLink, url: e.target.value };
						})
					}
					value={link.url}
					autoFocus
					type='text'
					className='rounded bg-transparent focus:ring-0 focus:border-primary-dark dark:focus:border-primary transition dark:text-primary text-primary-dark p-2 text-sm outline-0'
					placeholder='https://example.com'
				/>
			</div>

			<div className='mt-2 flex items-center space-x-1 text-sm select-none text-secondary-dark dark:text-secondary-light'>
				<input
					onChange={(e) =>
						setLink((prevLink) => {
							return { ...prevLink, openInNewTab: e.target.checked };
						})
					}
					type='checkbox'
					id='checkbox'
					className='focus:ring-0 rounded-sm w-3 h-3 outline-none'
					checked={link.openInNewTab}
				/>
				<label htmlFor='checkbox'>open in new tab</label>

				<div className='text-right flex-1'>
					<button
						onClick={(e) => handleSubmit(e)}
						className='bg-action text-primary text-sm px-2 py-1 rounded'
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
};

export default LinkForm;
