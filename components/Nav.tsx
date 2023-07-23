"use client";
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import logo from "@public/assets/images/logo.svg";
import { BuiltInProviderType } from "next-auth/providers";

function Navbar() {
	const { data: session } = useSession();
	const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setProvidersCallback = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setProvidersCallback();
	}, []);
	const userImage = session?.user?.image as string;
	
	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src={logo}
					alt="promptopia logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button
							onClick={() => signOut()}
							type="button"
							className="outline_btn"
						>
							Sign Out
						</button>
						<Link href="/profile">
							<Image
								src={userImage}
								alt="Profile"
								width={37}
								height={37}
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider: any) => (
								<button
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
			{/* Desktop Nav */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							src={logo}
							alt="Profile"
							width={37}
							height={37}
							className="rounded-full"
							onClick={() =>
								setToggleDropdown((prevState) => !prevState)
							}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									type="button"
									className="w-full black_btn mt-5"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider: any) => (
								<button
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
