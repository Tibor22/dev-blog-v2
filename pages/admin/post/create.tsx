import Editor from '@/components/editor';
import { NextPage } from 'next';
import AdminLayout from '@/components/common/layout/AdminLayout';

interface Props {}

const Create: NextPage<Props> = () => {
	return (
		<AdminLayout title='New Post'>
			<div className='max-w-4xl mx-auto'>
				<Editor
					onSubmit={(post) => {
						console.log(post);
					}}
					initialValue={{
						title: 'TITLE',
						meta: 'META',
						content: '<p>PARA</p>',
						slug: 'slug',
						tags: 'tags',
					}}
				/>
			</div>
		</AdminLayout>
	);
};

export default Create;
