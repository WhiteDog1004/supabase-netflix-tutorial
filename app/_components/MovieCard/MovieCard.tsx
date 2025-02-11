import Link from "next/link";

export const MovieCard = ({ list }) => {
	return (
		<div className="col-span-1 relative">
			<img className="w-full" src={list.image_url} />

			<Link href={`/movies/${list.id}`}>
				<div className="absolute flex items-center justify-center inset-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300">
					<p className="text-white text-xl font-bold">{list.title}</p>
				</div>
			</Link>
		</div>
	);
};
