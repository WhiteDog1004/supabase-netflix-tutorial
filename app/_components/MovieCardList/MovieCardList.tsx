import { searchMovies } from "@/actions/movieActions";
import { queryClient } from "@/config/ReactQueryClientProvider";
import { useSearchStore } from "@/store/searchStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { MovieCard } from "../MovieCard/MovieCard";

export const MovieCardList = () => {
	const { searchValue } = useSearchStore();
	const { data, isFetchingNextPage, isFetching, fetchNextPage, hasNextPage } =
		useInfiniteQuery({
			initialPageParam: 1,
			queryKey: ["movie", searchValue],
			queryFn: ({ pageParam }) =>
				searchMovies({
					search: searchValue,
					page: pageParam,
					pageSize: 12,
				}),
			getNextPageParam: (lastPage) =>
				lastPage.page ? lastPage.page + 1 : null,
		});

	const { ref, inView } = useInView({
		threshold: 0,
	});

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ["movie"] });
	}, [searchValue]);

	useEffect(() => {
		if (inView && hasNextPage && !isFetching && !isFetchingNextPage)
			fetchNextPage();
	}, [inView, hasNextPage]);

	return (
		<div className="mt-20">
			<div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full pb-14">
				{/* {(isFetching || isFetchingNextPage) && <Spinner />} */}
				<>
					{data?.pages
						?.map((page) => page.data)
						?.flat()
						?.map((data) => (
							<MovieCard list={data} key={data.id} />
						))}
					<div ref={ref} className="h-1" />
				</>
			</div>
		</div>
	);
};
