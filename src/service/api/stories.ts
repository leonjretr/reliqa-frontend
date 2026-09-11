"use server";

import { API_ENDPOINTS } from "@/config";
import { APICreatedStory, APIPaginatedResponse, APIStory, APIStoryDetail } from "@/service/types";

import { fetchAPI } from "./api";
import { fetchAuthenticated } from "./auth";

const listStories = async (params: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  return await fetchAPI<APIPaginatedResponse<APIStory>>(`${API_ENDPOINTS.STORIES}?${query}`, {
    method: "GET",
  });
};

export const getObjectStories = async (objectId: string) => {
  return await listStories({ object: objectId });
};

export const getUserStories = async (createdBy: string) => {
  return await listStories({ created_by: createdBy, ordering: "-created_at" });
};

export const getStory = async (id: string) => {
  return await fetchAPI<APIStoryDetail>(`${API_ENDPOINTS.STORIES}${id}/`, {
    method: "GET",
  });
};

export const createStory = async (objectId: string, story: string) => {
  return await fetchAuthenticated<APICreatedStory>(API_ENDPOINTS.STORIES, {
    method: "POST",
    body: JSON.stringify({ object: objectId, story }),
  });
};
