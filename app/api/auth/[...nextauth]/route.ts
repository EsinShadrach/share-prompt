import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		async signIn({ profile }) {
			try {
				await connectToDB();
				const userExists = await User.findOne({
					email: profile?.email,
				});

				if (!userExists) {
					await User.create({
						email: profile?.email,
						username: profile?.name,
						image: profile?.picture,
					});
				}

				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},

		async session({ session }: { session: Session | any }) {
			if (session.user?.email) {
				try {
					await connectToDB();
					const sessionUser = await User.findOne({
						email: session.user.email,
					});

					if (sessionUser) {
						session.user._id = sessionUser._id.toString();
					} else {
						// User not found in the database, handle this situation as needed.
						// For example, you can log an error or remove the user from the session.
						// console.error(`User with email ${session.user.email} not found in the database.`);
						// delete session.user;
					}
				} catch (error) {
					console.error("Error fetching user from database:", error);
				}
			}

			return session;
		},
	},
});

export { handler as GET, handler as POST };
