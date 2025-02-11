"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

const handleError = (error) => {
	if (error) {
		throw error;
	}
};

export const searchMovies = async (search = "") => {
	const supabase = await createServerSupabaseClient();

	const { data, error } = await supabase
		.from("movie")
		.select("*")
		.ilike("title", `%${search}%`);

	handleError(error);

	return data;
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
