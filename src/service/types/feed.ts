import type { APIObject } from "./objects";
import type { APIStoryListItem } from "./stories";

export type FeedEntry = {
  object: APIObject;
  story: APIStoryListItem | null;
};
