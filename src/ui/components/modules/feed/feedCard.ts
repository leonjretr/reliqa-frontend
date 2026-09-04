import type { APIUserSummary, FeedEntry } from "@/service/types";

export type FeedCard = {
  id: string;
  objectId: string;
  storyId?: string;
  photo?: string;
  category?: string;
  tags: string[];
  keeperName: string;
  year?: string;
  viewCount: number;
  quote?: string;
};

const formatKeeperName = (user: APIUserSummary) => {
  const fullName = `${user.first_name} ${user.last_name}`.trim();
  return fullName || user.username;
};

const yearOf = (isoDate: string) => String(new Date(isoDate).getFullYear());

export const buildFeedCard = ({ object, story }: FeedEntry): FeedCard => ({
  id: object.id,
  objectId: object.id,
  storyId: story?.id,
  photo: object.attachments[0]?.file.src,
  category: object.categories[0]?.name,
  tags: object.tags.map((tag) => tag.slug),
  keeperName: formatKeeperName(story?.created_by ?? object.created_by),
  year: yearOf(story?.created_at ?? object.created_at),
  viewCount: object.view_count,
  quote: story?.story,
});
