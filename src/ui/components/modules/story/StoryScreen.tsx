import type { APIStoryDetail } from "@/service/types";
import { ScrollBody } from "@/ui/components/common/ScrollBody";
import { formatKeeperName, formatYear, splitParagraphs } from "@/ui/utils";

import { StoryBody, StoryHero, StoryLinks } from "./sections";

type Props = {
  story: APIStoryDetail;
};

export const StoryScreen = ({ story }: Props) => {
  const keeperName = formatKeeperName(story.created_by);
  const category = story.object.categories[0];
  const paragraphs = splitParagraphs(story.story);
  const year = formatYear(story.created_at);

  return (
    <div className="relative flex h-full flex-col">
      <ScrollBody>
        <StoryHero
          objectName={story.object.name}
          keeperName={keeperName}
          category={category}
          photo={story.attachments[0]?.file.src}
          year={year}
          quote={paragraphs[0] ?? story.story}
        />
        <div className="px-4.5 pt-4.5 pb-6">
          <StoryBody heading={category ?? story.object.name} year={year} paragraphs={paragraphs} />
          <StoryLinks
            keeperName={keeperName}
            keeperUsername={story.created_by.username}
            objectId={story.object.id}
            objectName={story.object.name}
          />
        </div>
      </ScrollBody>
    </div>
  );
};
