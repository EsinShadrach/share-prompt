"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

function Feed() {
	const [searchText, setSearchText] = useState<string>("");
	const [posts, setPosts] = useState<any[]>([]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch("/api/prompts");
			const data = await response.json();
			setPosts(data);
		};
		fetchPost();
	}, []);

	return (
		<section className="feed">
			<form action="" className="relative w-full flex center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					className="search_input peer"
					required
				/>
			</form>
			<PromptCardList data={posts} handleTagClick={() => {}} />
		</section>
	);
}

export default Feed;

function PromptCardList({ data, handleTagClick }: PromptCardListProps) {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post: any, index: number) => (
				<PromptCard
					key={index}
					post={post}
					handleTagClick={handleTagClick}
					handleDelete={() => {}}
					handleEdit={() => {}}
				/>
			))}
		</div>
	);
}
