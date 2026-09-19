import type { APIObject } from "@/service/types";
import type { FeedCard } from "@/ui/types";

import { formatYear } from "./dates";
import { formatKeeperName } from "./keeper";

export const toFeedCard = (object: APIObject): FeedCard => ({
  objectId: object.id,
  hasStory: Boolean(object.story),
  name: object.name,
  photos: object.attachments.map((attachment) => attachment.file.src),
  category: object.categories[0]?.name,
  categorySlug: object.categories[0]?.slug,
  tags: object.tags.map((tag) => tag.slug),
  keeperName: formatKeeperName(object.created_by),
  year: formatYear(object.created_at),
  viewCount: object.view_count,
  quote: object.short_story || undefined,
});

export const dedupeByObject = (objects: APIObject[]): APIObject[] => {
  const seen = new Set<string>();
  return objects.filter((object) => {
    if (seen.has(object.id)) return false;
    seen.add(object.id);
    return true;
  });
};
