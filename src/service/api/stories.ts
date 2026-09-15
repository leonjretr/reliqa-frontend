"use server";

import { API_ENDPOINTS, API_ORDERINGS } from "@/config";
import {
  APICreatedStory,
  APIPaginatedResponse,
  APIStoryDetail,
  APIStoryListItem,
} from "@/service/types";

import { fetchAPI } from "./api";
import { fetchAuthenticated } from "./auth";

const listStories = async (params: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  return await fetchAPI<APIPaginatedResponse<APIStoryListItem>>(
    `${API_ENDPOINTS.STORIES}?${query}`,
    { method: "GET" },
  );
};

export const getObjectStories = async (objectId: string) => {
  return await listStories({ object: objectId });
};

export const getUserStories = async (createdBy: string) => {
  return await listStories({ created_by: createdBy, ordering: API_ORDERINGS.NEWEST });
};

export const getStory = async (id: string) => {
  return await fetchAPI<APIStoryDetail>(`${API_ENDPOINTS.STORIES}${id}/`, {
    method: "GET",
  });
};

export const createStory = async (objectId: string, story: string, shortStory: string) => {
  return await fetchAuthenticated<APICreatedStory>(API_ENDPOINTS.STORIES, {
    method: "POST",
    body: JSON.stringify({ object: objectId, story, short_story: shortStory }),
  });
};
