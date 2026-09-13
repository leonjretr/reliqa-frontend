import type { FeedEntry } from "@/service/types";
import { formatKeeperName } from "@/ui/utils";

export type FeedCard = {
  id: string;
  objectId: string;
  storyId?: string;
  name: string;
  photo?: string;
  category?: string;
  tags: string[];
  keeperName: string;
  year?: string;
  viewCount: number;
  quote?: string;
};

const yearOf = (isoDate: string) => String(new Date(isoDate).getFullYear());

export const buildFeedCard = ({ object, story }: FeedEntry): FeedCard => ({
  id: object.id,
  objectId: object.id,
  storyId: story?.id,
  name: object.name,
  photo: object.attachments[0]?.file.src,
  category: object.categories[0]?.name,
  tags: object.tags.map((tag) => tag.slug),
  keeperName: formatKeeperName(story?.created_by ?? object.created_by),
  year: yearOf(story?.created_at ?? object.created_at),
  viewCount: object.view_count,
  quote: story?.short_story,
});
