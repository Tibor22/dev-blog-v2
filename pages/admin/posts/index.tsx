import AdminLayout from '@/components/common/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}

const Admin: NextPage<Props> = () => {
	return (
		<AdminLayout>
			<div>Posts</div>
		</AdminLayout>
	);
};

export default Admin;
