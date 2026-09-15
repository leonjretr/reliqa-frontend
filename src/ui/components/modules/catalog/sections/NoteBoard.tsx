"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { OBJECT_NOTES_SHOWN } from "@/config";
import type { APIStoryListItem } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { MonoLabel } from "@/ui/components/common/MonoLabel";

import { StoryNote } from "./StoryNote";

type Props = {
  category?: string;
  photo?: string;
  stories: APIStoryListItem[];
  storiesCount: number;
};

export const NoteBoard = ({ category, photo, stories, storiesCount }: Props) => {
  const t = useTranslations("Object");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-ink relative isolate h-99.5 border">
      <KeptPhoto category={category} src={photo} className="absolute inset-0" />
      {stories.slice(0, OBJECT_NOTES_SHOWN).map((story, index) => (
        <StoryNote
          key={story.id}
          story={story}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
      <div className="bg-ink text-chalk absolute -bottom-px -left-px px-2.5 pt-1.5 pb-1.25">
        <MonoLabel as="span" className="text-chalk">
          {t("STORIES_STUCK_ON", { count: storiesCount })}
        </MonoLabel>
      </div>
    </div>
  );
};
