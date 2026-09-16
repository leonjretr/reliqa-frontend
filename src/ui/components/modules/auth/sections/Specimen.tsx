import { useTranslations } from "next-intl";
import Image from "next/image";

import { IMAGE_SIZES, META_SEPARATOR } from "@/config";
import type { CatalogueObject } from "@/service/types";

type Props = {
  object: CatalogueObject;
};

export const Specimen = ({ object }: Props) => {
  const t = useTranslations("Auth");
  const photo = object.attachments[0]?.file.src;
  const category = object.categories[0];

  return (
    <li className="border-auth-line-on-dark flex items-center gap-4 border-t py-3.5">
      <div className="bg-auth-ink-700 rounded-paper relative flex h-16 w-13 flex-none items-center justify-center overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={object.name}
            fill
            sizes={IMAGE_SIZES.THUMBNAIL}
            className="object-cover"
          />
        ) : (
          <span className="font-plex-mono text-auth-text-on-dark/38 text-eyebrow tracking-spaced uppercase">
            {t("LABEL_PHOTO_PLACEHOLDER")}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.25">
        <span className="text-auth-text-on-dark font-newsreader truncate text-lg">
          {object.name}
        </span>
        <span className="text-auth-text-on-dark-muted font-plex-mono text-meta tracking-widest uppercase">
          {category && (
            <>
              {category}
              {META_SEPARATOR}
            </>
          )}
          {t("SPECIMEN_INSTANCES", { count: object.stories_count })}
        </span>
      </div>
    </li>
  );
};
