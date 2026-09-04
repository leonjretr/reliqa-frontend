"use server";

import { getFeedObject, getObjectStories } from "@/service/api";
import type { APIObject, FeedEntry } from "@/service/types";

const DEFAULT_FEED_BATCH_SIZE = 6;

export const loadFeedEntries = async (
  count: number = DEFAULT_FEED_BATCH_SIZE,
  exclude: string[] = [],
): Promise<FeedEntry[]> => {
  const seen = new Set(exclude);
  const objects: APIObject[] = [];
  const maxAttempts = count * 4;

  for (let attempt = 0; objects.length < count && attempt < maxAttempts; attempt++) {
    const object = await getFeedObject([...seen]);

    if (!object.success) {
      break;
    }

    if (seen.has(object.id)) {
      continue;
    }

    seen.add(object.id);
    objects.push(object);
  }

  return await Promise.all(
    objects.map(async (object) => {
      const stories = await getObjectStories(object.id);
      const story = stories.success ? (stories.results[0] ?? null) : null;

      return { object, story };
    }),
  );
};
