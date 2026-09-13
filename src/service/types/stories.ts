import type { APIAttachment, APIObjectListItem, APIUserSummary } from "./objects";

export type APIStorySource = {
  id: string;
  slug: string;
  name: string;
};

export type APIStoryListItem = {
  id: string;
  object: string;
  short_story: string;
  source: APIStorySource | null;
  location: string;
  acquired_at: string | null;
  created_by: APIUserSummary;
  created_at: string;
};

export type APICreatedStory = {
  id: string;
  object: string;
  short_story: string;
  story: string;
  source: string | null;
  location: string;
  acquired_at: string | null;
  previous_owner: string;
  created_by: APIUserSummary;
  created_at: string;
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
