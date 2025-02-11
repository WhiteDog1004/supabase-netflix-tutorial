import { deleteFile } from "@/actions/storageActions";
import { queryClient } from "@/config/ReactQueryClientProvider";
import { getImageUrl } from "@/utils/supabase/storage";
import { IconButton, Spinner, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

export const ImageItem = ({ name }) => {
	const deleteFileMutation = useMutation({
		mutationFn: deleteFile,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["images"],
			});
		},
	});

	const handleDeleteClick = () => {
		if (confirm("정말 삭제하시겠습니까?")) {
			deleteFileMutation.mutate(name);
		}
	};

	return (
		<div className="w-full flex flex-col gap-2 p-4 border rounded-2xl">
			<div>
				<Image
					src={`${getImageUrl(name)}`}
					width={80}
					height={80}
					alt={"animal"}
					className="w-full aspect-square rounded-2xl"
				/>
			</div>
			<div className="flex flex-row justify-between items-center">
				<Typography className="text-center">{name}</Typography>
				<IconButton
					onClick={handleDeleteClick}
					variant="outlined"
					color="red"
				>
					{deleteFileMutation.isPending ? (
						<Spinner color="red" />
					) : (
						<i className="fas fa-trash" />
					)}
				</IconButton>
			</div>
		</div>
	);
};
