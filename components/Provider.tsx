"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

type ProviderProps = {
	children: React.ReactNode;
	session?: Session | null;
};

function Provider({ children, session }: ProviderProps) {
	return (
		<SessionProvider session={session}>
			{children}
		</SessionProvider>
	);
}

export default Provider;
