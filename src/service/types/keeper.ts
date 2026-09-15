import type { APICurrentUser, APIUserPublic } from "./auth";
import type { APIObjectListItem } from "./objects";
import type { APIStoryListItem } from "./stories";

export type KeeperShelf = {
  objects: APIObjectListItem[];
  stories: APIStoryListItem[];
};

export type KeeperPage = KeeperShelf & {
  user: APICurrentUser | APIUserPublic;
  isOwn: boolean;
};
