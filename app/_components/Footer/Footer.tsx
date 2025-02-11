import Link from "next/link";

export const Footer = () => {
	return (
		<footer className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900">
			<div className="flex gap-2 items-center text-center font-bold text-white justify-center">
				<p>Movie Database Scraped from </p>
				<Link
					className="text-blue-600"
					href="https://www.themoviedb.org/"
				>
					TMDB
				</Link>
			</div>
		</footer>
	);
};
