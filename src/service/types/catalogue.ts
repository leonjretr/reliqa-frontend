import type { APICategoryDetail, APICategoryListItem } from "./categories";
import type { APIObjectListItem } from "./objects";

export type Catalogue = {
  objects: APIObjectListItem[];
  totalCount: number;
  category?: APICategoryDetail;
};

export type CaptureOptions = {
  categories: APICategoryListItem[];
  initialCategory?: string;
};
