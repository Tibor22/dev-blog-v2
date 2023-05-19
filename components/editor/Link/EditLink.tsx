import { FC } from 'react';
import { BsBoxArrowUpRight, BsPencilSquare } from 'react-icons/bs';
import { BiUnlink } from 'react-icons/bi';

interface Props {}

const EditLink: FC<Props> = (): JSX.Element => {
	const handleOnLinkOpenClick = () => {};

	const handleLinkEditClick = () => {};

	const handleUnlinkClick = () => {};

	return (
		<div>
			<div className='rounded bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary shadow-secondary-dark shadow-md p-3 flex items-center space-x-6 z-50'>
				<button onClick={handleOnLinkOpenClick}>
					<BsBoxArrowUpRight />
				</button>

				<button onClick={handleLinkEditClick}>
					<BsPencilSquare />
				</button>

				<button onClick={handleUnlinkClick}>
					<BiUnlink />
				</button>
			</div>
		</div>
	);
};

export default EditLink;
