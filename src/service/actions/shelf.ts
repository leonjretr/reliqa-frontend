"use server";

import { API_ORDERINGS } from "@/config";
import { getCurrentUser, getObjects, getUserByUsername, getUserStories } from "@/service/api";
import type { KeeperPage, KeeperShelf } from "@/service/types";

const loadKeeperShelf = async (userId: string): Promise<KeeperShelf> => {
  const [objects, stories] = await Promise.all([
    getObjects({ createdBy: userId, ordering: API_ORDERINGS.NEWEST }),
    getUserStories(userId),
  ]);

  return {
    objects: objects.success ? objects.results : [],
    stories: stories.success ? stories.results : [],
  };
};

export const loadKeeperPage = async (username: string): Promise<KeeperPage | null> => {
  const currentUser = await getCurrentUser();
  const isOwn = currentUser.success && currentUser.username === username;
  const user = isOwn ? currentUser : await getUserByUsername(username);

  if (!user.success) {
    return null;
  }

  return { user, isOwn, ...(await loadKeeperShelf(user.id)) };
};
