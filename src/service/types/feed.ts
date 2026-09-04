import type { APIObject } from "./objects";
import type { APIStory } from "./stories";

export type FeedEntry = {
  object: APIObject;
  story: APIStory | null;
};
