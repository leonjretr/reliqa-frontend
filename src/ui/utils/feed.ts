import type { FeedEntry } from "@/service/types";
import type { FeedCard } from "@/ui/types";

import { formatYear } from "./dates";
import { formatKeeperName } from "./keeper";

export const toFeedCard = ({ object, story }: FeedEntry): FeedCard => ({
  objectId: object.id,
  storyId: story?.id,
  name: object.name,
  photo: object.attachments[0]?.file.src,
  category: object.categories[0]?.name,
  tags: object.tags.map((tag) => tag.slug),
  keeperName: formatKeeperName(story?.created_by ?? object.created_by),
  year: formatYear(story?.created_at ?? object.created_at),
  viewCount: object.view_count,
  quote: story?.short_story,
});
