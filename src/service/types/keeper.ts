import type { APICurrentUser, APIUserPublic } from "./auth";
import type { APIObjectListItem } from "./objects";

export type KeeperShelf = {
  objects: APIObjectListItem[];
};

export type KeeperPage = KeeperShelf & {
  user: APICurrentUser | APIUserPublic;
  isOwn: boolean;
};
