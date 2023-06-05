import Editor, { FinalPost } from '@/components/editor';
import { NextPage } from 'next';
import AdminLayout from '@/components/common/layout/AdminLayout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { generateFormData } from '@/utils/helper';

interface Props {}

const Create: NextPage<Props> = () => {
	const [creating, setCreating] = useState(false);
	const router = useRouter();
	const handleSubmit = async (post: FinalPost) => {
		setCreating(true);
		try {
			// we have to generate FormData
			const formData = generateFormData(post);

			// submit our post
			const { data } = await axios.post('/api/posts', formData);
			router.push('/admin/posts/update/' + data.post.slug);
		} catch (error: any) {
			console.log(error.response.data);
		}
		setCreating(false);
	};
	return (
		<AdminLayout title='New Post'>
			<div className='max-w-4xl mx-auto'>
				<Editor onSubmit={handleSubmit} busy={creating} />
			</div>
		</AdminLayout>
	);
};

export default Create;
