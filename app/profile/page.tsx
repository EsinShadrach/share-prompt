"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { Session } from "next-auth";

export default function Page() {
	const [posts, setPosts] = useState<any[]>([]);
	const { data } = useSession();
	const router = useRouter();
	const session: Session | any = data;
	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(
				`/api/users/${session?.user?._id}/posts`
			);
			const data = await response.json();
			setPosts(data);
		};

		if (session?.user?._id) fetchPost();
	}, [session]);

	const handleEdit = (post: Post) => {
		router.push(`/update-prompt?_id=${post._id}`);
	};
	const handleDelete = async (post: Post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this post?"
		);
		
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompts/${post._id.toString()}`, {
					method: "DELETE",
				});

				const filteredPost = posts.filter(
					(post) => post._id !== post._id
				);
				
				setPosts(filteredPost);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<>
			<Profile
				name="My"
				desc="Welcome to your personalised profile page"
				data={posts}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</>
	);
}
