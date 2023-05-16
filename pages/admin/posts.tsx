import AdminLayout from '@/components/common/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}

const Posts: NextPage<Props> = () => {
	return (
		<AdminLayout>
			<div>Posts Page</div>
		</AdminLayout>
	);
};

export default Posts;
