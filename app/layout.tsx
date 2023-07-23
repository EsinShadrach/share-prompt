import Navbar from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Promptopia",
	description: "Discover, create, and share prompts AI Prompts",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Navbar />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
}
