import { getCategories, getTags } from "@/service/api";

export const fetchCategoryOptions = async (query?: string) => {
  const response = await getCategories({ query });
  return response.success ? response.results : [];
};

export const fetchTagOptions = async (query?: string) => {
  const response = await getTags({ query });
  return response.success ? response.results : [];
};
