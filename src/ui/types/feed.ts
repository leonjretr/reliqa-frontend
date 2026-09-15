export type FeedCard = {
  objectId: string;
  storyId?: string;
  name: string;
  photo?: string;
  category?: string;
  categorySlug?: string;
  tags: string[];
  keeperName: string;
  year?: string;
  viewCount: number;
  quote?: string;
};
