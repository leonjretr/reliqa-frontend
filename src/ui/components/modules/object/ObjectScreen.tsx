import type { APIObject } from "@/service/types";
import { ScrollBody } from "@/ui/components/common/ScrollBody";
import { formatKeeperName, formatYear, splitParagraphs } from "@/ui/utils";

import { ObjectBody, ObjectFacts, ObjectHero, ObjectLinks } from "./sections";

type Props = {
  object: APIObject;
};

export const ObjectScreen = ({ object }: Props) => {
  const keeperName = formatKeeperName(object.created_by);
  const category = object.categories[0];
  const paragraphs = splitParagraphs(object.story || object.description);
  const year = formatYear(object.created_at);

  return (
    <div className="relative flex h-full flex-col">
      <ScrollBody>
        <ObjectHero
          objectName={object.name}
          keeperName={keeperName}
          categorySlug={category?.slug}
          categoryName={category?.name}
          photo={object.attachments[0]?.file.src}
          year={year}
          quote={object.short_story || paragraphs[0]}
        />
        <div className="px-4.5 pt-4.5 pb-6">
          <ObjectBody heading={category?.name ?? object.name} year={year} paragraphs={paragraphs} />
          <ObjectFacts object={object} />
          <ObjectLinks keeperName={keeperName} keeperUsername={object.created_by.username} />
        </div>
      </ScrollBody>
    </div>
  );
};
