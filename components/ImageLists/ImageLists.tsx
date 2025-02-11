import { searchFiles } from "@/actions/storageActions";
import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { ImageItem } from "../ImageItem";

export const ImageLists = ({ searchInput }) => {
	const searchImageQuery = useQuery({
		queryKey: ["images", searchInput],
		queryFn: () => searchFiles(searchInput),
	});
	return (
		<div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-3">
			{searchImageQuery.isPending && <Spinner />}
			{searchImageQuery.data &&
				searchImageQuery.data.map((image) => (
					<ImageItem name={image.name} key={image.id} />
				))}
		</div>
	);
};
