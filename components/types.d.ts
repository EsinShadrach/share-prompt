interface FormProps {
	type: string;
	post: {
		prompt: string;
		tag: string;
	};
	setPost: React.Dispatch<
		React.SetStateAction<{
			prompt: string;
			tag: string;
		}>
	>;
	submitting: boolean;
	handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
}

interface PromptCardListProps {
	data: Array;
	handleTagClick: () => void;
}

interface PromptCardProps {
	post: Post;
	handleTagClick?: (text: string) => void;
	handleEdit?: () => void;
	handleDelete?: () => void;
}

interface ProfileProps {
	name: string;
	desc: string;
	data: Array;
	handleEdit?: (param: any) => void;
	handleDelete?: (param: any) => void;
}
