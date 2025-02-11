import { Input } from "@material-tailwind/react";

export const SearchInput = ({ searchInput, setSearchInput }) => {
	return (
		<Input
			value={searchInput}
			onChange={(e) => setSearchInput(e.target.value)}
			label="Search Images"
			placeholder="Search Images"
			icon={<i className="fas fa-search" />}
		/>
	);
};
