"use client";

import { useSearchStore } from "@/store/searchStore";
import Image from "next/image";

export const Header = () => {
	const { setSearchValue } = useSearchStore();

	return (
		<header className="fixed top-0 z-10 left-0 right-0 p-4 bg-gray-900 flex items-center justify-between">
			<nav className="flex gap-2 items-center">
				<Image
					src={"/images/tmdbflix_logo.png"}
					width={30}
					height={30}
					alt={"logo"}
					className="w-24"
				/>
				<ul className="flex gap-2 text-white">
					<li>Movies</li>
					<li>Dramas</li>
				</ul>
			</nav>

			<div className="flex gap-2 w-full max-w-72 items-center bg-transparent text-white border border-white rounded-md p-2">
				<i className="fas fa-search" />
				<input
					placeholder="search movies"
					onChange={(e) => setSearchValue(e.currentTarget.value)}
					className="bg-transparent"
				/>
			</div>
		</header>
	);
};
