import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { searchCategories } from "@/service/actions";
import type { APICategoryListItem } from "@/service/types";
import { Combobox, ComboboxInput, ComboboxInputGroup } from "@/ui/components/lib/shadcn";
import { useRemoteOptions } from "@/ui/hooks";

import { SelectItem } from "./SelectItem";
import { SelectPopup } from "./SelectPopup";
import { SELECT_INPUT_CLASS_NAME, SELECT_INPUT_GROUP_CLASS_NAME } from "./styles";

const findBySlug = (categories: APICategoryListItem[], slug: string) =>
  categories.find((category) => category.slug === slug);

type Props = {
  categories: APICategoryListItem[];
  value: string;
  onChange: (slug: string) => void;
};

export const CategorySelect = ({ categories, value, onChange }: Props) => {
  const t = useTranslations("Capture");
  const [inputValue, setInputValue] = useState(() => findBySlug(categories, value)?.name ?? "");
  const { results, isPending } = useRemoteOptions({
    query: inputValue,
    fetchOptions: searchCategories,
    initialOptions: categories,
  });

  const selected = findBySlug(results, value) ?? findBySlug(categories, value) ?? null;
  const items = useMemo(
    () => (!selected || findBySlug(results, selected.slug) ? results : [...results, selected]),
    [results, selected],
  );

  return (
    <Combobox
      items={items}
      value={selected}
      inputValue={inputValue}
      itemToStringLabel={(category: APICategoryListItem) => category.name}
      filter={null}
      onValueChange={(next) => onChange(next?.slug ?? "")}
      onInputValueChange={setInputValue}
    >
      <ComboboxInputGroup className={SELECT_INPUT_GROUP_CLASS_NAME}>
        <ComboboxInput
          placeholder={t("PLACEHOLDER_CATEGORY")}
          className={SELECT_INPUT_CLASS_NAME}
        />
      </ComboboxInputGroup>
      <SelectPopup isPending={isPending} emptyLabel={t("EMPTY_CATEGORIES")}>
        {(category: APICategoryListItem) => (
          <SelectItem key={category.id} value={category}>
            {category.name}
          </SelectItem>
        )}
      </SelectPopup>
    </Combobox>
  );
};
