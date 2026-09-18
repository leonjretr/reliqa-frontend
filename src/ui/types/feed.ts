export type FeedCard = {
  objectId: string;
  hasStory: boolean;
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
