import { searchMovies } from "@/actions/movieActions";
import { queryClient } from "@/config/ReactQueryClientProvider";
import { useSearchStore } from "@/store/searchStore";
import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MovieCard } from "../MovieCard/MovieCard";

export const MovieCardList = () => {
	const { searchValue } = useSearchStore();
	const { data, isPending } = useQuery({
		queryKey: ["movie"],
		queryFn: () => searchMovies(searchValue),
	});

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ["movie"] });
	}, [searchValue]);

	return (
		<div className="mt-20">
			<div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
				{isPending && <Spinner />}
				{data?.map((list) => (
					<MovieCard list={list} key={list.id} />
				))}
			</div>
		</div>
	);
};
