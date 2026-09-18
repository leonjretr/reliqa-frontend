"use server";

import { API_ORDERINGS, SPECIMENS_SHOWN } from "@/config";
import { getCategories, getCategory, getObjects } from "@/service/api";
import type { APIObjectListItem, CaptureOptions, Catalogue } from "@/service/types";

export const loadCatalogue = async (categorySlug?: string): Promise<Catalogue> => {
  const [objects, category] = await Promise.all([
    getObjects({ categories: categorySlug }),
    categorySlug ? getCategory(categorySlug) : undefined,
  ]);

  return {
    objects: objects.success ? objects.results : [],
    totalCount: objects.success ? objects.count : 0,
    category: category?.success ? category : undefined,
  };
};

export const loadSpecimens = async (): Promise<APIObjectListItem[]> => {
  const objects = await getObjects({ ordering: API_ORDERINGS.NEWEST });
  return objects.success ? objects.results.slice(0, SPECIMENS_SHOWN) : [];
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
