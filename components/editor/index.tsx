import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './ToolBar';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import TipTapImage from '@tiptap/extension-image';
import EditLink from './Link/EditLink';
import GalleryModal from './GalleryModal';
import { ImageSelectionResult } from './GalleryModal';
import axios from 'axios';
import SEOForm, { SeoResult } from './SEOForm';
import ActionButton from '../common/ActionButton';
import ThumbnailSelector from './ThumbnailSelector';

export interface FinalPost extends SeoResult {
	title: string;
	content: String;
	thumbnail?: File | string;
}

interface Props {
	initialValue?: FinalPost;
	btnTitle?: string;
	busy?: boolean;
	onSubmit(post: FinalPost): void;
}

const Editor: FC<Props> = ({
	onSubmit,
	initialValue,
	btnTitle = 'Submit',
	busy = false,
}): JSX.Element => {
	const [selectionRange, setSelectionRange] = useState<Range>();
	const [showGallery, setShowGallery] = useState(false);
	const [images, setImages] = useState<{ src: string }[]>([]);
	const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
	const [uploading, setUploading] = useState(false);
	const [post, setPost] = useState<FinalPost>({
		title: '',
		content: '',
		meta: '',
		tags: '',
		slug: '',
	});

	const fetchImages = async () => {
		const { data } = await axios('/api/image');
		setImages(data.images);
	};

	const handleImageUpload = async (image: File) => {
		setUploading(true);
		const formData = new FormData();
		formData.append('image', image);
		const { data } = await axios.post('/api/image', formData);
		setImages((prevImages) => [...prevImages, data]);
		setUploading(false);
	};

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({
				autolink: false,
				linkOnPaste: false,
				openOnClick: false,
				HTMLAttributes: {
					target: '',
				},
			}),
			Placeholder.configure({
				placeholder: 'Type something',
			}),
			Youtube.configure({
				width: 840,
				height: 472.5,
				HTMLAttributes: {
					class: 'mx-auto rounded',
				},
			}),
			TipTapImage.configure({
				HTMLAttributes: {
					class: 'mx-auto',
				},
			}),
		],
		editorProps: {
			handleClick(view, pos, event) {
				const { state } = view;
				const selectionRange = getMarkRange(
					state.doc.resolve(pos),
					state.schema.marks.link
				);
				if (selectionRange) setSelectionRange(selectionRange);
			},
			attributes: {
				class:
					'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
			},
		},
	});

	const handleImageSelection = (result: ImageSelectionResult) => {
		editor
			?.chain()
			.focus()
			.setImage({ src: result.src, alt: result.altText })
			.run();
	};

	useEffect(() => {
		if (editor && selectionRange) {
			editor.commands.setTextSelection(selectionRange);
		}
	}, [editor, selectionRange]);
	useEffect(() => {
		fetchImages();
	}, []);
	useEffect(() => {
		if (initialValue) {
			setPost({ ...initialValue });
			editor?.commands.setContent(initialValue.content);

			const { meta, slug, tags } = initialValue;
			setSeoInitialValue({ meta, slug, tags });
		}
	}, [initialValue, editor]);

	const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		setPost((prevPost) => ({ ...prevPost, title: target.value }));
	};
	const updateSEOValue = (result: SeoResult) => {
		setPost((prevPost) => ({ ...prevPost, ...result }));
	};
	const updateThumbnail = (file: File) => {
		setPost((prevPost) => ({ ...prevPost, thumbnail: file }));
	};

	const handleSubmit = () => {
		if (!editor) return;
		onSubmit({ ...post, content: editor.getHTML() });
	};

	return (
		<>
			<div className='p-3 dark:bg-primary-dark bg-primary transition'>
				<div className='sticky top-0 z-10 dark:bg-primary-dark bg-primary'>
					<div className='flex items-center justify-between mb-3'>
						<ThumbnailSelector
							initialValue={post.thumbnail as string}
							onChange={updateThumbnail}
						/>
						<div className='inline-block'>
							<ActionButton
								busy={busy}
								onClick={handleSubmit}
								title={btnTitle}
							/>
						</div>
					</div>
					<input
						value={post.title}
						onChange={updateTitle}
						type='text'
						placeholder='Title'
						className=' py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3'
					/>
					<ToolBar
						editor={editor}
						onOpenImageClick={() => setShowGallery(true)}
					/>
					<div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3'></div>
				</div>
				{editor ? <EditLink editor={editor} /> : null}
				<EditorContent editor={editor} className='min-h-[300px]' />
				<div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3'></div>
				<SEOForm
					onChange={updateSEOValue}
					title={post.title}
					initialValue={seoInitialValue}
				/>
			</div>
			{showGallery && (
				<GalleryModal
					images={images}
					visible={showGallery}
					onClose={() => setShowGallery(false)}
					onSelect={handleImageSelection}
					onFileSelect={handleImageUpload}
					uploading={uploading}
				/>
			)}
		</>
	);
};

export default Editor;
