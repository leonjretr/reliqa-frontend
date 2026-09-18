"use server";

import { FEED_BATCH_SIZE } from "@/config";
import { getFeedObject } from "@/service/api";
import type { APIObject } from "@/service/types";

export const loadFeedEntries = async (count: number = FEED_BATCH_SIZE): Promise<APIObject[]> => {
  const responses = await Promise.all(Array.from({ length: count }, () => getFeedObject()));
  return responses.filter((object) => object.success);
};
