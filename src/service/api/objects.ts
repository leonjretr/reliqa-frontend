import "server-only";

import { API_ENDPOINTS } from "@/config";
import {
  APICreatedObject,
  APIObject,
  APIObjectListItem,
  APIPaginatedResponse,
} from "@/service/types";

import { fetchAPI } from "./api";
import { fetchAuthenticated } from "./auth";
import { withQuery } from "./query";

export const getFeedObject = async (exclude: string[] = []) => {
  return await fetchAPI<APIObject>(
    withQuery(API_ENDPOINTS.OBJECTS_FEED, { exclude: exclude.join(",") }),
    {
      method: "GET",
    },
  );
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
  return await fetchAPI<APIPaginatedResponse<APIObjectListItem>>(
    withQuery(API_ENDPOINTS.OBJECTS, { created_by: createdBy, categories, ordering }),
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
