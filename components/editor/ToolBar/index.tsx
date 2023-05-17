import { FC } from 'react';
import { Editor } from '@tiptap/react';
import DropdownOptions from '@/components/common/DropDownOptions';

interface Props {
	editor: Editor | null;
}

const ToolBar: FC<Props> = ({ editor }): JSX.Element | null => {
	if (!editor) return null;

	return (
		<div>
			<DropdownOptions
				options={[
					{
						label: 'Paragraph',
						onClicky: () => {
							console.log('Paragraph clicked');
						},
					},
					{
						label: 'Heading 1',
						onClicky: () => {
							console.log('Heading 1 clicked');
						},
					},
					{
						label: 'Heading 2',
						onClicky: () => {
							console.log('Heading 2 clicked');
						},
					},
					{
						label: 'Heading 3',
						onClicky: () => {
							console.log('Heading 3 clicked');
						},
					},
				]}
				head={<p>Paragraph</p>}
			/>
		</div>
	);
};

export default ToolBar;
