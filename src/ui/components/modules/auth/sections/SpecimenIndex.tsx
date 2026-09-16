import { useTranslations } from "next-intl";

import { APP_NAME } from "@/config";
import type { CatalogueObject } from "@/service/types";

import { Specimen } from "./Specimen";

type Props = {
  specimens: CatalogueObject[];
};

export const SpecimenIndex = ({ specimens }: Props) => {
  const t = useTranslations("Auth");

  return (
    <aside className="bg-auth-ink-900 hidden min-w-0 flex-col justify-between gap-10 px-10 py-11 lg:flex lg:w-1/2">
      <div className="flex flex-nowrap items-baseline justify-between gap-6">
        <span className="text-auth-text-on-dark font-newsreader text-title-lg tracking-snug">
          {APP_NAME}
        </span>
        <span className="text-auth-text-on-dark-muted font-plex-mono text-meta tracking-spaced whitespace-nowrap uppercase">
          {t("KICKER")}
        </span>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-auth-text-on-dark font-newsreader max-w-promise text-title-lg leading-promise tracking-snug text-pretty">
          {t("PROMISE")}
        </p>
        <ul className="flex flex-col">
          {specimens.map((specimen) => (
            <Specimen key={specimen.id} object={specimen} />
          ))}
        </ul>
      </div>

      <figure className="border-auth-line-on-dark max-w-quote flex flex-col gap-2.5 border-t pt-6">
        <blockquote className="text-auth-paper-200 font-newsreader leading-reading text-lg text-pretty">
          {t("QUOTE")}
        </blockquote>
        <figcaption className="text-auth-text-on-dark-muted font-plex-mono text-meta tracking-widest uppercase">
          {t("QUOTE_ATTRIBUTION")}
        </figcaption>
      </figure>
    </aside>
  );
};
