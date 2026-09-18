import { useTranslations } from "next-intl";
import { motion, type MotionValue } from "framer-motion";

import { FEED_TAGS_SHOWN, META_SEPARATOR, thingPath } from "@/config";
import { Link } from "@/i18n";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import type { FeedCard } from "@/ui/types";

type Props = {
  card: FeedCard;
  opacity: MotionValue<number>;
  y: MotionValue<number> | number;
};

export const SlideCopy = ({ card, opacity, y }: Props) => {
  const t = useTranslations("Feed");
  const common = useTranslations("Common");
  const subtitle = [card.category, card.year].filter(Boolean).join(META_SEPARATOR);
  const tagLine = card.tags.slice(0, FEED_TAGS_SHOWN).join(META_SEPARATOR);

  return (
    <motion.div className="absolute right-15.5 bottom-5.5 left-0 px-4.5" style={{ opacity, y }}>
      {subtitle && <MonoLabel className="text-chalk/72">{subtitle}</MonoLabel>}
      <div className="text-chalk text-title-lg leading-title tracking-snug mt-1.5 font-bold">
        {card.name}
      </div>
      {tagLine && <MonoLabel className="text-chalk/72 mt-1">{tagLine}</MonoLabel>}
      {card.quote ? (
        <>
          <p className="text-chalk text-quote leading-quote mt-3 font-light">
            {common("QUOTE", { text: card.quote })}
          </p>
          <MonoLabel className="text-chalk/72 mt-1.5">
            {t("QUOTE_AUTHOR", { keeper: card.keeperName })}
          </MonoLabel>
        </>
      ) : (
        <p className="text-chalk/50 text-copy leading-quote mt-3 font-light italic">
          {t("EMPTY_QUOTE")}
        </p>
      )}
      {card.hasStory && (
        <Link href={thingPath(card.objectId)} className="mt-3 inline-block no-underline">
          <MonoLabel as="span" className="text-honey">
            {t("LINK_READ_MORE")}
          </MonoLabel>
        </Link>
      )}
    </motion.div>
  );
};
