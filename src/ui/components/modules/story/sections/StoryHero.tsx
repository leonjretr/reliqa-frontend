import { useTranslations } from "next-intl";

import { META_SEPARATOR, PAGES } from "@/config";
import { Link } from "@/i18n";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { PhotoShade } from "@/ui/components/common/PhotoShade";

type Props = {
  objectName: string;
  keeperName: string;
  category?: string;
  photo?: string;
  year: string;
  quote: string;
};

export const StoryHero = ({ objectName, keeperName, category, photo, year, quote }: Props) => {
  const t = useTranslations("Story");
  const common = useTranslations("Common");

  return (
    <div className="relative h-93">
      <KeptPhoto
        category={category}
        src={photo}
        alt={t("PHOTO_ALT", { object: objectName, keeper: keeperName })}
        className="absolute inset-0"
      />
      <PhotoShade variant="story" />
      <Link href={PAGES.FEED} className="absolute top-3.75 left-4.5 no-underline">
        <MonoLabel as="span" className="text-chalk">
          {t("LINK_FEED")}
        </MonoLabel>
      </Link>
      <MonoLabel
        as="span"
        className="text-chalk/72 absolute top-3.75 right-4.5 lining-nums tabular-nums"
      >
        {year}
      </MonoLabel>
      <div className="absolute inset-x-0 bottom-0 px-4.5 pb-4.5">
        {category && (
          <MonoLabel className="text-chalk/72">
            {category}
            {META_SEPARATOR}
            {objectName}
          </MonoLabel>
        )}
        <div className="text-chalk text-heading-lg leading-heading mt-1.5 font-bold tracking-tight">
          {keeperName}
        </div>
        <p className="text-chalk text-lede leading-quote mt-2.5 font-light italic">
          {common("QUOTE", { text: quote })}
        </p>
      </div>
    </div>
  );
};
