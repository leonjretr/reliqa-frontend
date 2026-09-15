import type { APICategoryDetail, APICategoryListItem } from "./categories";
import type { APIObjectListItem } from "./objects";

export type CatalogueObject = APIObjectListItem & { stories_count: number };

export type Catalogue = {
  objects: CatalogueObject[];
  totalCount: number;
  category?: APICategoryDetail;
};

export type CaptureOptions = {
  categories: APICategoryListItem[];
  initialCategory?: string;
};
