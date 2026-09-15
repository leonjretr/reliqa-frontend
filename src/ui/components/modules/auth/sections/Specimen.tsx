import { useTranslations } from "next-intl";

import { META_SEPARATOR } from "@/config";

type Props = {
  name: string;
  category: string;
  instances: number;
};

export const Specimen = ({ name, category, instances }: Props) => {
  const t = useTranslations("Auth");

  return (
    <li className="border-auth-line-on-dark flex items-center gap-4 border-t py-3.5">
      <div className="bg-auth-ink-700 rounded-paper flex h-16 w-13 flex-none items-center justify-center">
        <span className="font-plex-mono text-auth-text-on-dark/38 text-eyebrow tracking-spaced uppercase">
          {t("LABEL_PHOTO_PLACEHOLDER")}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.25">
        <span className="text-auth-text-on-dark font-newsreader text-lg">{name}</span>
        <span className="text-auth-text-on-dark-muted font-plex-mono text-meta tracking-widest uppercase">
          {category}
          {META_SEPARATOR}
          {t("SPECIMEN_INSTANCES", { count: instances })}
        </span>
      </div>
    </li>
  );
};
