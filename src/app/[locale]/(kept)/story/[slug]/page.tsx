import { notFound } from "next/navigation";

import { getStory, STORIES } from "@/ui/components/modules/feed";
import { StoryScreen } from "@/ui/components/modules/story";

export const generateStaticParams = () => STORIES.map((story) => ({ slug: story.slug }));

const Page = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) {
    notFound();
  }

  return <StoryScreen story={story} />;
};

export default Page;
