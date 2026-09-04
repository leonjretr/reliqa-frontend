"use server";

import { API_ENDPOINTS } from "@/config";
import { APIAttachment } from "@/service/types";

import { fetchAuthenticated } from "./auth";

export const createStoryAttachment = async (storyId: string, file: File, position: number = 0) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("position", String(position));

  return await fetchAuthenticated<APIAttachment>(
    `${API_ENDPOINTS.STORIES}${storyId}/attachments/`,
    {
      method: "POST",
      body: formData,
    },
  );
};
