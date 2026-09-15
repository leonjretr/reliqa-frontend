"use server";

import { FEED_BATCH_SIZE } from "@/config";
import { getFeedObject, getObjectStories } from "@/service/api";
import type { APIObject, FeedEntry } from "@/service/types";

export const loadFeedEntries = async (count: number = FEED_BATCH_SIZE): Promise<FeedEntry[]> => {
  const responses = await Promise.all(Array.from({ length: count }, () => getFeedObject()));
  const objects: APIObject[] = responses.filter((object) => object.success);

  return await Promise.all(
    objects.map(async (object) => {
      const stories = await getObjectStories(object.id);
      const story = stories.success ? (stories.results[0] ?? null) : null;

      return { object, story };
    }),
  );
};
