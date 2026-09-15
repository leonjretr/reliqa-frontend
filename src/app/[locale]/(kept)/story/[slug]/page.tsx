import { notFound } from "next/navigation";

import { getStory } from "@/service/api";
import { StoryScreen } from "@/ui/components/modules/story";

const Page = async ({ params }: PageProps<"/[locale]/story/[slug]">) => {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story.success) {
    notFound();
  }

  return <StoryScreen story={story} />;
};

export default Page;
