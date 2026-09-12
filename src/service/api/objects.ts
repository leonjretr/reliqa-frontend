"use server";

import { API_ENDPOINTS } from "@/config";
import {
  APICreatedObject,
  APIObject,
  APIObjectListItem,
  APIPaginatedResponse,
} from "@/service/types";

import { fetchAPI } from "./api";
import { fetchAuthenticated } from "./auth";

export const getFeedObject = async (exclude: string[] = []) => {
  const query = exclude.length ? `?exclude=${exclude.map(encodeURIComponent).join(",")}` : "";
  return await fetchAPI<APIObject>(`${API_ENDPOINTS.OBJECTS_FEED}${query}`, {
    method: "GET",
  });
};

export const getObject = async (id: string) => {
  return await fetchAPI<APIObject>(`${API_ENDPOINTS.OBJECTS}${id}/`, {
    method: "GET",
  });
};

export type GetObjectsParams = {
  createdBy?: string;
  categories?: string;
  ordering?: string;
};

export const getObjects = async ({ createdBy, categories, ordering }: GetObjectsParams = {}) => {
  const params = new URLSearchParams();
  if (createdBy) params.set("created_by", createdBy);
  if (categories) params.set("categories", categories);
  if (ordering) params.set("ordering", ordering);
  const query = params.toString() ? `?${params.toString()}` : "";

  return await fetchAPI<APIPaginatedResponse<APIObjectListItem>>(
    `${API_ENDPOINTS.OBJECTS}${query}`,
    { method: "GET" },
  );
};

export type CreateObjectInput = {
  name: string;
  description?: string;
  categories?: string[];
  tags?: string[];
  invented_at?: string;
};

export const createObject = async (input: CreateObjectInput) => {
  return await fetchAuthenticated<APICreatedObject>(API_ENDPOINTS.OBJECTS, {
    method: "POST",
    body: JSON.stringify(input),
  });
};
