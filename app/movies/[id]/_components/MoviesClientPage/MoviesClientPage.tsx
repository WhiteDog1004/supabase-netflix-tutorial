"use client";

import { getMovie } from "@/actions/movieActions";
import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const MoviesClientPage = ({ id }) => {
	const { data, isPending } = useQuery({
		queryKey: ["detail"],
		queryFn: () => getMovie(id),
	});

	return (
		<div className="flex flex-col items-center md:flex-row gap-6">
			{isPending ? (
				<Spinner />
			) : (
				<>
					<Image
						src={data.image_url}
						width={320}
						height={320}
						alt={data.title}
						className="md:w-1/3 w-2/3 h-auto relative"
					/>

					<div className="md:w-2/3 w-full flex flex-col md:gap-4 gap-2 justify-center md:items-start items-center">
						<h1 className="md:text-3xl text-2xl font-bold">
							{data.title}
						</h1>
						<p className="md:text-lg text-sm font-medium">
							{data.overview}
						</p>
						<div className="font-bold md:text-lg text-sm">
							<i
								className="fas fa-star"
								style={{ color: "#a20000" }}
							/>{" "}
							{Math.floor(data.vote_average)} / 10
						</div>
						<div className="font-bold md:text-lg text-sm">
							인기 : {Math.floor(data.popularity)}
						</div>
						<div className="font-bold md:text-lg text-sm">
							방영일 : {data.release_date}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
