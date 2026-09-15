import { useTranslations } from "next-intl";
import { motion, type MotionValue } from "framer-motion";

import { PAGES, thingPath } from "@/config";
import { LinesIcon, PlusIcon } from "@/ui/components/common/icons";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import type { FeedCard } from "@/ui/types";
import { groupThousands } from "@/ui/utils";

import { RailButton } from "./RailButton";

const PLUS_STROKE_WIDTH = 1.6;

type Props = {
  card: FeedCard;
  opacity: MotionValue<number>;
  x: MotionValue<number> | number;
};

export const SlideRail = ({ card, opacity, x }: Props) => {
  const t = useTranslations("Feed");

  return (
    <motion.div
      className="absolute right-3 bottom-33 flex flex-col items-center gap-5"
      style={{ opacity, x }}
    >
      <div className="flex flex-col items-center gap-0.75">
        <span className="text-chalk font-kept-mono text-field font-medium lining-nums tabular-nums">
          {groupThousands(card.viewCount)}
        </span>
        <MonoLabel as="span" className="text-chalk/72 text-micro">
          {t("LABEL_SEEN")}
        </MonoLabel>
      </div>
      <RailButton
        href={PAGES.ADD}
        filled
        label={t("RAIL_ADD")}
        glyph={<PlusIcon className="size-5" strokeWidth={PLUS_STROKE_WIDTH} />}
      />
      <RailButton
        href={thingPath(card.objectId)}
        label={t("RAIL_OBJECT")}
        glyph={<LinesIcon className="size-5" />}
      />
    </motion.div>
  );
};
