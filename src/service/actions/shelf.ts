"use server";

import { getObjects, getUserStories } from "@/service/api";
import type { APIObjectListItem, APIStoryListItem } from "@/service/types";

export const loadKeeperShelf = async (
  userId: string,
): Promise<{ objects: APIObjectListItem[]; stories: APIStoryListItem[] }> => {
  const [objects, stories] = await Promise.all([
    getObjects({ createdBy: userId, ordering: "-created_at" }),
    getUserStories(userId),
  ]);

  return {
    objects: objects.success ? objects.results : [],
    stories: stories.success ? stories.results : [],
  };
};
