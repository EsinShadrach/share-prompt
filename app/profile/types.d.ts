interface Post {
	prompt: string;
	tag: string;
    _id: string;
	creator: {
		image: string;
		username: string;
		email: string;
		_id: string;
	};
}
