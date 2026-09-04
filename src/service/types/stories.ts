import type { APIUserSummary } from "./objects";

export type APIStory = {
  id: string;
  object: string;
  story: string;
  created_by: APIUserSummary;
  created_at: string;
};

export type APICreatedStory = APIStory & {
  updated_at: string;
};
