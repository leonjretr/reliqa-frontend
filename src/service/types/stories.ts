import type { APIAttachment, APIObjectListItem, APIUserSummary } from "./objects";

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

export type APIStoryDetail = {
  id: string;
  object: APIObjectListItem;
  story: string;
  created_by: APIUserSummary;
  attachments: APIAttachment[];
  created_at: string;
  updated_at: string;
};
