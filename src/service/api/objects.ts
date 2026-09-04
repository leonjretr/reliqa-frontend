"use server";

import { API_ENDPOINTS } from "@/config";
import { APICreatedObject, APIObject } from "@/service/types";

import { fetchAPI } from "./api";
import { fetchAuthenticated } from "./auth";

export const getFeedObject = async (exclude: string[] = []) => {
  const query = exclude.length ? `?exclude=${exclude.map(encodeURIComponent).join(",")}` : "";
  return await fetchAPI<APIObject>(`${API_ENDPOINTS.OBJECTS_FEED}${query}`, {
    method: "GET",
  });
};

export const createObject = async () => {
  return await fetchAuthenticated<APICreatedObject>(API_ENDPOINTS.OBJECTS, {
    method: "POST",
    body: JSON.stringify({}),
  });
};
