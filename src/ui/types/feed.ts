export type FeedCard = {
  objectId: string;
  hasStory: boolean;
  name: string;
  photos: string[];
  category?: string;
  categorySlug?: string;
  tags: string[];
  keeperName: string;
  year?: string;
  viewCount: number;
  quote?: string;
};
