"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { Session } from "next-auth";

export default function EditPrompt() {
	const [submitting, setSubmitting] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const promptId = searchParams.get("_id");

	const router = useRouter();

	const updatePrompt = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitting(true);
        if (!promptId) return alert("Prompt ID not found")
        
		try {
			const response = await fetch(`/api/prompts/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
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

	useEffect(() => {
        console.log(promptId)
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompts/${promptId}`);
			const data = await response.json();
			setPost({ prompt: data.prompt, tag: data.tag });
		};
		if (promptId) getPromptDetails();
	}, [promptId]);

	const [post, setPost] = useState<{
		prompt: string;
		tag: string;
	}>({ prompt: "", tag: "" });

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
}
