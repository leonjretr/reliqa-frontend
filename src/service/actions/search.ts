"use server";

import { getCategories, getTags } from "@/service/api";

export const searchCategories = async (query?: string) => {
  const response = await getCategories({ query });
  return response.success ? response.results : [];
};

export const searchTags = async (query?: string) => {
  const response = await getTags({ query });
  return response.success ? response.results : [];
};
