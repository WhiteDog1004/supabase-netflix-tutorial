import { getMovie } from "@/actions/movieActions";
import { MoviesClientPage } from "./_components/MoviesClientPage";

export const generateMetadata = async ({ params }) => {
	const movie = await getMovie(params.id);

	return {
		title: movie.title,
		description: movie.overview,
		openGraph: {
			images: [movie.image_url],
		},
	};
};

const MovieDetail = ({ params }) => {
	return (
		<main className="flex justify-center items-center px-16 py-20 bg-blue-50 w-full absolute inset-0">
			<MoviesClientPage id={params.id} />
		</main>
	);
};

export default MovieDetail;
