import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
	description: "My Next Home",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
