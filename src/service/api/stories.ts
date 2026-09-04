"use server";

import { API_ENDPOINTS } from "@/config";
import { APICreatedStory, APIPaginatedResponse, APIStory } from "@/service/types";

import { fetchAPI } from "./api";
import { fetchAuthenticated } from "./auth";

export const getObjectStories = async (objectId: string) => {
  return await fetchAPI<APIPaginatedResponse<APIStory>>(
    `${API_ENDPOINTS.STORIES}?object=${encodeURIComponent(objectId)}`,
    { method: "GET" },
  );
};

export const createStory = async (objectId: string, story: string) => {
  return await fetchAuthenticated<APICreatedStory>(API_ENDPOINTS.STORIES, {
    method: "POST",
    body: JSON.stringify({ object: objectId, story }),
  });
};
