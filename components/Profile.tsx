import PromptCard from "./PromptCard";

function Profile({ name, desc, data, handleEdit, handleDelete }: ProfileProps) {

	return (
		<section className="w-full">
			<h1 className="head_text">
				<span className="blue_gradient">{name} Profile</span>
			</h1>
			<p className="desc text-left">{desc}</p>
			<div className="mt-10 prompt_layout">
				{data.map((post: any, index: number) => (
					<PromptCard
						key={index}
						post={post}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>
		</section>
	);
}

export default Profile;
