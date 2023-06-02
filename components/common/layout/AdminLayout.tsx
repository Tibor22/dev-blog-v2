import { FC, ReactNode } from 'react';
import AdminNav from '../AdminNav';
import {
	AiOutlineContainer,
	AiOutlineDashboard,
	AiOutlineFileAdd,
	AiOutlineMail,
	AiOutlineTeam,
} from 'react-icons/ai';
import Link from 'next/link';

interface Props {
	children: ReactNode;
	title?: string;
}

const AdminLayout: FC<Props> = ({ children, title }): JSX.Element => {
	const navItems = [
		{ href: '/admin', icon: AiOutlineDashboard, label: 'Dashboard' },
		{ href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
		{ href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
		{ href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
	];
	return (
		<div className='flex'>
			<AdminNav navItems={navItems} />
			<div className='flex-1 p-4'>{children}</div>
			{/* create button */}
			<Link
				className='bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition '
				href='/admin/post/create'
			>
				<AiOutlineFileAdd size={24} />
			</Link>
		</div>
	);
};

export default AdminLayout;
