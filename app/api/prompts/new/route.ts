import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
	const { prompt, tag, userId } = await req.json();
	try {
		await connectToDB();
		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag,
		});
		await newPrompt.save();
		return new Response(JSON.stringify(newPrompt), {
			status: 201,
		});
	} catch (error) {
		console.log(error)
		return new Response("Failed to create a new prompt", {
			status: 500,
		});
	} finally {
	}
};
