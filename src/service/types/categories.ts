import type { APIFile } from "./objects";

export type APICategoryListItem = {
  id: string;
  name: string;
  slug: string;
  objects_count: number;
  stories_count: number;
};

export type APICategoryDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover: APIFile | null;
  objects_count: number;
  stories_count: number;
};
