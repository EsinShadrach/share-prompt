"use client";
import { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { Session } from "next-auth";

export default function CreatePrompt() {
	const [submitting, setSubmitting] = useState<boolean>(false);
	const { data, status } = useSession();
	const session: Session | any = data;
	const router = useRouter();
	// const [error, setError] = useState<string | null>(null);

	const createPrompt = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitting(true);
		try {
			const response = await fetch("/api/prompts/new", {
				method: "POST",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
					userId: session?.user?._id,
				}),
			});
			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log("CATCH BLOCK");
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	const [post, setPost] = useState<{
		prompt: string;
		tag: string;
	}>({ prompt: "", tag: "" });

	return (
		<Form
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
}
