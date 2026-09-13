"use server";

import { API_ENDPOINTS } from "@/config";
import { APICategoryDetail, APICategoryListItem, APIPaginatedResponse } from "@/service/types";

import { fetchAPI } from "./api";

export type GetCategoriesParams = {
  query?: string;
};

export const getCategories = async ({ query }: GetCategoriesParams = {}) => {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  const search = params.toString() ? `?${params.toString()}` : "";

  return await fetchAPI<APIPaginatedResponse<APICategoryListItem>>(
    `${API_ENDPOINTS.CATEGORIES}${search}`,
    { method: "GET" },
  );
};

export const getCategory = async (slug: string) => {
  return await fetchAPI<APICategoryDetail>(`${API_ENDPOINTS.CATEGORIES}${slug}/`, {
    method: "GET",
  });
};
