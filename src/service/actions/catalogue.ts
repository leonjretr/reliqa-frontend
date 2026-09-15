"use server";

import { getCategories, getCategory, getObjects, getObjectStories } from "@/service/api";
import type {
  APIObjectListItem,
  CaptureOptions,
  Catalogue,
  CatalogueObject,
} from "@/service/types";

const withStoriesCount = async (object: APIObjectListItem): Promise<CatalogueObject> => {
  const stories = await getObjectStories(object.id);
  return { ...object, stories_count: stories.success ? stories.count : 0 };
};

export const loadCatalogue = async (categorySlug?: string): Promise<Catalogue> => {
  const [objects, category] = await Promise.all([
    getObjects({ categories: categorySlug }),
    categorySlug ? getCategory(categorySlug) : undefined,
  ]);

  return {
    objects: objects.success ? await Promise.all(objects.results.map(withStoriesCount)) : [],
    totalCount: objects.success ? objects.count : 0,
    category: category?.success ? category : undefined,
  };
};

export const loadCaptureOptions = async (categorySlug?: string): Promise<CaptureOptions> => {
  const [categories, category] = await Promise.all([
    getCategories(),
    categorySlug ? getCategory(categorySlug) : undefined,
  ]);
  const list = categories.success ? categories.results : [];
  const initialCategory = category?.success ? category : undefined;
  const isListed = list.some((item) => item.slug === initialCategory?.slug);

  return {
    categories: initialCategory && !isListed ? [...list, initialCategory] : list,
    initialCategory: initialCategory?.slug,
  };
};
