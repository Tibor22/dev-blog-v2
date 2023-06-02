import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import slugify from 'slugify';
import classnames from 'classnames';

export interface SeoResult {
	meta: string;
	slug: string;
	tags: string;
}

interface Props {
	title?: string;
	onChange(result: SeoResult): void;
	initialValue?: SeoResult;
}

const commonInput =
	'w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition text-primary-dark dark:text-primary p-2';

const Input: FC<{
	name?: string;
	value?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	label: string;
}> = ({ name, value, placeholder, label, onChange }) => (
	<label className='block relative'>
		<span className='absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2'>
			{label}
		</span>
		<input
			type='text'
			name={name}
			placeholder={placeholder}
			className={classnames(commonInput, 'italic pl-11')}
			onChange={onChange}
			value={value}
		/>
	</label>
);

const SEOForm: FC<Props> = ({
	title = '',
	onChange,
	initialValue,
}): JSX.Element => {
	const [values, setValues] = useState({ meta: '', slug: '', tags: '' });

	const handleChange: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		let { name, value } = e.target;
		if (name === 'meta') value = value.substring(0, 150);

		setValues((prevValues) => ({ ...prevValues, [name]: value }));
		onChange({ ...values, [name]: value });
	};

	useEffect(() => {
		const slug = slugify(title.toLowerCase());
		setValues((prevValues) => ({ ...prevValues, slug }));
		onChange({ ...values, slug });
	}, [title]);
	useEffect(() => {
		if (initialValue) {
			setValues({ ...initialValue, slug: slugify(initialValue.slug) });
		}
	}, [initialValue]);

	const { meta, slug, tags } = values;
	return (
		<div className='space-y-4'>
			<h1 className='text-primary-dark dark:text-primary text-xl font-semibold'>
				SEO Section
			</h1>
			<Input
				value={slug}
				name='slug'
				placeholder='slug-goes-here'
				label='Slug:'
				onChange={handleChange}
			/>
			<Input
				value={tags}
				name='tags'
				placeholder='React, Next JS'
				label='Tags:'
				onChange={handleChange}
			/>
			<div className='relative'>
				<textarea
					onChange={handleChange}
					value={meta}
					name='meta'
					className={classnames(commonInput, 'text-lg h-20 resize-none')}
					placeholder='Meta description 150 characters will be fine'
				></textarea>
				<p className='absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm'>
					{meta.length}/150
				</p>
			</div>
		</div>
	);
};

export default SEOForm;
