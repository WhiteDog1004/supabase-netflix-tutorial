import { uploadFile } from "@/actions/storageActions";
import { queryClient } from "@/config/ReactQueryClientProvider";
import { Spinner, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const FileDragDrop = () => {
	const uploadImageMutation = useMutation({
		mutationFn: uploadFile,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["images"],
			});
		},
	});

	const onDrop = useCallback(async (acceptedFiles) => {
		if (acceptedFiles.length > 0) {
			const formData = new FormData();

			acceptedFiles.forEach((file) => {
				formData.append(file.name, file);
			});

			await uploadImageMutation.mutate(formData);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: true,
	});

	return (
		<div
			{...getRootProps()}
			className="w-full border-2 border-dotted border-indigo-700 flex flex-col items-center justify-center relative"
		>
			<div className="py-20 flex flex-col">
				<input {...getInputProps()} />
				{uploadImageMutation.isPending ? (
					<Spinner />
				) : isDragActive ? (
					<Typography>여기에 놓아서 업로드하세요!</Typography>
				) : (
					<Typography>
						파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요!
					</Typography>
				)}
			</div>
		</div>
	);
};
