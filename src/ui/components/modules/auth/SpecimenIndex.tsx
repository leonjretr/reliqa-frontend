"use client";

import { useTranslations } from "next-intl";

const SPECIMENS = [
  { name: "Zenit-E", meta: "Cameras · 41 instances" },
  { name: "Singer 15K sewing machine", meta: "Household · 18 instances" },
  { name: "Bialetti Moka Express", meta: "Kitchen · 96 instances" },
  { name: "Tatra 815 model lorry", meta: "Toys · 7 instances" },
];

export const SpecimenIndex = () => {
  const t = useTranslations("Auth");

  return (
    <aside className="bg-auth-ink-900 hidden min-w-0 flex-col justify-between gap-10 px-10 py-11 lg:flex lg:w-1/2">
      <div className="flex flex-nowrap items-baseline justify-between gap-6">
        <span className="text-auth-text-on-dark font-newsreader text-title-lg tracking-snug">
          Reliqa
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
          {SPECIMENS.map((specimen) => (
            <li
              key={specimen.name}
              className="border-auth-line-on-dark flex items-center gap-4 border-t py-3.5"
            >
              <div className="bg-auth-ink-700 rounded-paper flex h-16 w-13 flex-none items-center justify-center">
                <span className="font-plex-mono text-auth-text-on-dark/38 text-eyebrow tracking-spaced uppercase">
                  Photo
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.25">
                <span className="text-auth-text-on-dark font-newsreader text-lg">
                  {specimen.name}
                </span>
                <span className="text-auth-text-on-dark-muted font-plex-mono text-meta tracking-widest uppercase">
                  {specimen.meta}
                </span>
              </div>
            </li>
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
