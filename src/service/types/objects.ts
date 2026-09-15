export type APIUserSummary = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
};

export type APIFile = {
  id: string;
  src: string;
  type: string;
  created_by: APIUserSummary | null;
  created_at: string;
  updated_at: string;
};

export type APICategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover: APIFile | null;
};

export type APITag = {
  id: string;
  slug: string;
};

export type APIAttachment = {
  id: string;
  file: APIFile;
  position: number;
  created_at: string;
};

export type APIObject = {
  id: string;
  name: string;
  description: string;
  invented_at: string | null;
  created_by: APIUserSummary;
  categories: APICategory[];
  tags: APITag[];
  attachments: APIAttachment[];
  stories_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
};

export type APIObjectListItem = {
  id: string;
  name: string;
  description: string;
  created_by: APIUserSummary;
  categories: string[];
  tags: string[];
  attachments: APIAttachment[];
  created_at: string;
};

export type APICreatedObject = {
  id: string;
  name: string;
  description: string;
  invented_at: string | null;
  created_by: APIUserSummary;
  categories: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
};
