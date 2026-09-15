import { useTranslations } from "next-intl";

import { keeperPath, NOTE_SHADOWS, OBJECT_NOTES_SHOWN, STOCK } from "@/config";
import { Link } from "@/i18n";
import type { APIStoryListItem } from "@/service/types";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { formatKeeperName, formatYear } from "@/ui/utils";

const NOTE_POSITIONS = [
  { left: 14, top: 18, rotate: -6 },
  { left: 192, top: 58, rotate: 4 },
  { left: 30, top: 168, rotate: 3 },
  { left: 158, top: 212, rotate: -3 },
  { left: 62, top: 296, rotate: -2 },
];

const RAISE_OFFSET_PX = -16;
const RAISE_SCALE = 1.04;
const RAISED_LAYER = OBJECT_NOTES_SHOWN + 1;

type Props = {
  story: APIStoryListItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

export const StoryNote = ({ story, index, isOpen, onToggle }: Props) => {
  const t = useTranslations("Object");
  const common = useTranslations("Common");
  const position = NOTE_POSITIONS[index];
  const stock = STOCK[index % STOCK.length];

  return (
    <button
      onClick={onToggle}
      className="border-ink rounded-paper ease-lift absolute w-43.5 cursor-pointer border px-3 pt-2.5 pb-2.75 text-left transition-[transform,box-shadow] duration-340"
      style={{
        left: position.left,
        top: position.top,
        background: stock.bg,
        color: stock.fg,
        transform: `rotate(${position.rotate}deg) translateY(${isOpen ? RAISE_OFFSET_PX : 0}px) scale(${isOpen ? RAISE_SCALE : 1})`,
        boxShadow: isOpen ? NOTE_SHADOWS.RAISED : NOTE_SHADOWS.RESTING,
        zIndex: isOpen ? RAISED_LAYER : index + 1,
      }}
    >
      <div className="mb-0.75 flex items-baseline justify-between opacity-76">
        <MonoLabel as="span" className="text-stamp text-inherit lining-nums tabular-nums">
          {formatYear(story.created_at)}
        </MonoLabel>
      </div>
      <div className="text-copy-lg leading-card font-semibold">
        {formatKeeperName(story.created_by)}
      </div>
      {isOpen && (
        <>
          <p className="text-aside leading-quote-lg mt-2 font-light">
            {story.short_story || common("EMPTY_VALUE")}
          </p>
          <Link
            href={keeperPath(story.created_by.username)}
            className="font-kept-mono text-eyebrow mt-2 inline-block tracking-widest uppercase"
          >
            {t("LINK_THEIR_SHELF")}
          </Link>
        </>
      )}
    </button>
  );
};
