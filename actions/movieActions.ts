"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

const handleError = (error) => {
	if (error) {
		throw error;
	}
};

export const searchMovies = async ({ search = "", page, pageSize }) => {
	const supabase = await createServerSupabaseClient();

	const { data, error, count } = await supabase
		.from("movie")
		.select("*", { count: "exact" })
		.ilike("title", `%${search}%`)
		.range((page - 1) * pageSize, page * pageSize - 1);

	const hasNextPage = count > page * pageSize;

	if (error) {
		return {
			data: [],
			page: 0,
			pageSize: null,
			hasNextPage: null,
			error,
		};
	}

	return {
		data,
		page,
		pageSize,
		hasNextPage,
	};
};

export const getMovie = async (id) => {
	const supabase = await createServerSupabaseClient();

	const { data, error } = await supabase
		.from("movie")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	handleError(error);

	return data;
};
