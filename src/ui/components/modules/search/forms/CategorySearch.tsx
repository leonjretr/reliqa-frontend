"use client";

import { useTranslations } from "next-intl";

import { QUERIES } from "@/config";
import { SearchIcon } from "@/ui/components/common/icons";

import { useQueryParamSync } from "../hooks";

export const CategorySearch = () => {
  const t = useTranslations("Search");
  const [value, setValue] = useQueryParamSync(QUERIES.QUERY);

  return (
    <label className="bg-chalk border-ink rounded-paper shadow-card flex items-center gap-2 border px-3.25 py-2.75">
      <SearchIcon className="text-ink-faint size-4 flex-none" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t("PLACEHOLDER_SEARCH")}
        aria-label={t("LABEL_SEARCH")}
        className="text-ink placeholder:text-ink-soft text-copy search-cancel-hidden min-w-0 flex-1 bg-transparent font-light outline-none placeholder:italic"
      />
    </label>
  );
};
