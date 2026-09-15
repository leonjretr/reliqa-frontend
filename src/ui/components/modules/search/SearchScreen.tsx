import { useTranslations } from "next-intl";

import type { APICategoryListItem } from "@/service/types";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { ScrollBody } from "@/ui/components/common/ScrollBody";

import { CategorySearch } from "./forms";
import { CategoryCard } from "./sections";

type Props = {
  categories: APICategoryListItem[];
  query?: string;
};

export const SearchScreen = ({ categories, query }: Props) => {
  const t = useTranslations("Search");
  const isEmptyResult = categories.length === 0 && Boolean(query);

  return (
    <div className="cork-texture flex h-full flex-col">
      <div className="px-4.5 pt-4.5 pb-1">
        <MonoLabel className="text-chalk/75 mb-2">{t("TITLE_SEARCH")}</MonoLabel>
        <CategorySearch />
      </div>
      {isEmptyResult && (
        <MonoLabel className="text-chalk/75 text-meta px-4.5 pt-5.5">
          {t("EMPTY_RESULTS", { query: query ?? "" })}
        </MonoLabel>
      )}
      <ScrollBody className="grid grid-cols-2 content-start gap-x-4 gap-y-7 px-4 pt-5.5 pb-6">
        {categories.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} />
        ))}
      </ScrollBody>
    </div>
  );
};
