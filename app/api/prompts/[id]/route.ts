import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
	try {
		await connectToDB();

		const prompt = await Prompt.findById(params.id).populate("creator");
		if (!prompt) {
			return new Response("Prompt not found", {
				status: 404,
			});
		}
		return new Response(JSON.stringify(prompt), {
			status: 200,
		});
	} catch (error) {
		return new Response("Failed to fetch prompts", {
			status: 500,
		});
	}
};

export const PATCH = async (request: NextRequest, { params }: any) => {
	const { prompt, tag } = await request.json();
	try {
		await connectToDB();
		const promptToUpdate = await Prompt.findById(params.id);
		if (!promptToUpdate) {
			return new Response("Prompt not found", {
				status: 404,
			});
		}
		promptToUpdate.prompt = prompt;
		promptToUpdate.tag = tag;

		await promptToUpdate.save();

		return new Response(JSON.stringify(promptToUpdate), {
			status: 200,
		});
	} catch (error) {
		return new Response("Failed to update", {
			status: 500,
		});
	}
};

export const DELETE = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		await connectToDB();
		const promptToDelete = await Prompt.findByIdAndDelete(params.id);
		if (!promptToDelete) {
			return new Response("Prompt not found", {
				status: 404,
			});
		}

		return new Response("Deleted", {
			status: 200,
		});
	} catch (error) {
		return new Response("Failed to delete", {
			status: 500,
		});
	}
};
