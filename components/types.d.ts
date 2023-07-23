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
	post: {
		prompt: string;
		tag: string;
		creator: {
			image: string;
			username: string;
			email: string;
		};
	};
	handleTagClick: (text: string) => void;
	handleEdit: () => void;
	handleDelete: () => void;
}
