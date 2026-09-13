"use server";

import { API_ENDPOINTS } from "@/config";
import { APIPaginatedResponse, APITagListItem } from "@/service/types";

import { fetchAPI } from "./api";

export type GetTagsParams = {
  query?: string;
  ordering?: string;
};

export const getTags = async ({ query, ordering }: GetTagsParams = {}) => {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (ordering) params.set("ordering", ordering);
  const search = params.toString() ? `?${params.toString()}` : "";

  return await fetchAPI<APIPaginatedResponse<APITagListItem>>(`${API_ENDPOINTS.TAGS}${search}`, {
    method: "GET",
  });
};
