import "server-only";

import { API_ENDPOINTS } from "@/config";
import { APIAttachment } from "@/service/types";

import { fetchAuthenticated } from "./auth";

export const createObjectAttachment = async (
  objectId: string,
  file: File,
  position: number = 0,
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("position", String(position));

  return await fetchAuthenticated<APIAttachment>(
    `${API_ENDPOINTS.OBJECTS}${objectId}/attachments/`,
    {
      method: "POST",
      body: formData,
    },
  );
};
