import "server-only";

import { API_ENDPOINTS } from "@/config";
import { APICategoryDetail, APICategoryListItem, APIPaginatedResponse } from "@/service/types";

import { fetchAPI } from "./api";
import { withQuery } from "./query";

export type GetCategoriesParams = {
  query?: string;
};

export const getCategories = async ({ query }: GetCategoriesParams = {}) => {
  return await fetchAPI<APIPaginatedResponse<APICategoryListItem>>(
    withQuery(API_ENDPOINTS.CATEGORIES, { query }),
    { method: "GET" },
  );
};

export const getCategory = async (slug: string) => {
  return await fetchAPI<APICategoryDetail>(`${API_ENDPOINTS.CATEGORIES}${slug}/`, {
    method: "GET",
  });
};
