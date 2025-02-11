import { MoviesClientPage } from "./_components/MoviesClientPage";

const MovieDetail = ({ params }) => {
	return (
		<main className="flex justify-center items-center px-16 py-20 bg-blue-50 w-full absolute inset-0">
			<MoviesClientPage id={params.id} />
		</main>
	);
};

export default MovieDetail;
