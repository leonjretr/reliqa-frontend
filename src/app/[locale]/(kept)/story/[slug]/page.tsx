import { notFound } from "next/navigation";

import { getStory } from "@/service";
import { StoryScreen } from "@/ui/components/modules/story";

const Page = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story.success) {
    notFound();
  }

  return <StoryScreen story={story} />;
};

export default Page;
