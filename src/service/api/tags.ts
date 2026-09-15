import "server-only";

import { API_ENDPOINTS } from "@/config";
import { APIPaginatedResponse, APITagListItem } from "@/service/types";

import { fetchAPI } from "./api";
import { withQuery } from "./query";

export type GetTagsParams = {
  query?: string;
  ordering?: string;
};

export const getTags = async ({ query, ordering }: GetTagsParams = {}) => {
  return await fetchAPI<APIPaginatedResponse<APITagListItem>>(
    withQuery(API_ENDPOINTS.TAGS, { query, ordering }),
    {
      method: "GET",
    },
  );
};
