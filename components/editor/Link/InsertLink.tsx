import { FC, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import Button from '../ToolBar/Button';
import LinkForm, { linkOption } from './LinkForm';

interface Props {
	onSubmit(link: linkOption): void;
}

const InsertLink: FC<Props> = ({ onSubmit }) => {
	const [visible, setVisible] = useState(false);
	const handleSubmit = (link: linkOption) => {
		if (!link.url.trim()) return setVisible(false);
		onSubmit(link);
		setVisible(false);
	};
	return (
		<div
			onKeyDown={({ key }) => (key === 'Escape' ? setVisible(false) : '')}
			className='relative'
		>
			<Button onClick={() => setVisible(!visible)}>
				<BsLink45Deg />
			</Button>
			<div className='absolute top-full mt-4 right-0'>
				<LinkForm onSubmit={handleSubmit} visible={visible} />
			</div>
		</div>
	);
};

export default InsertLink;
