"use server";

import { API_ENDPOINTS } from "@/config";
import { APICategoryListItem, APIPaginatedResponse } from "@/service/types";

import { fetchAPI } from "./api";

export const getCategories = async () => {
  return await fetchAPI<APIPaginatedResponse<APICategoryListItem>>(API_ENDPOINTS.CATEGORIES, {
    method: "GET",
  });
};
