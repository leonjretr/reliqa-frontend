"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";

import { SEARCH_DEBOUNCE_MS } from "@/config";
import { getCategories } from "@/service/api";
import type { APICategoryListItem } from "@/service/types";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxStatus,
} from "@/ui/components/lib/shadcn/combobox";
import { useDebouncedValue } from "@/ui/hooks";

type CategoryPickerProps = {
  categories: APICategoryListItem[];
  value: string;
  onChange: (slug: string) => void;
};

export const CategoryPicker = ({ categories, value, onChange }: CategoryPickerProps) => {
  const [results, setResults] = useState(categories);
  const [inputValue, setInputValue] = useState(
    () => categories.find((category) => category.slug === value)?.name ?? "",
  );
  const [isPending, startTransition] = useTransition();
  const debouncedQuery = useDebouncedValue(inputValue.trim(), SEARCH_DEBOUNCE_MS);
  const requestIdRef = useRef(0);

  const selected = useMemo(() => {
    return (
      results.find((category) => category.slug === value) ??
      categories.find((category) => category.slug === value) ??
      null
    );
  }, [results, categories, value]);

  const items = useMemo(() => {
    if (!selected || results.some((category) => category.slug === selected.slug)) {
      return results;
    }
    return [...results, selected];
  }, [results, selected]);

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    startTransition(async () => {
      const response = await getCategories({ query: debouncedQuery || undefined });
      if (requestIdRef.current !== requestId) return;
      setResults(response.success ? response.results : []);
    });
  }, [debouncedQuery]);

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
      <ComboboxInputGroup className="border-ink font-kept-mono rounded-none border-0 border-b bg-transparent px-0 py-[6px]">
        <ComboboxInput
          placeholder="search categories"
          className="text-ink placeholder:text-ink-faint h-auto text-[15px] tracking-[0.02em] lowercase placeholder:font-light placeholder:italic"
        />
      </ComboboxInputGroup>
      <ComboboxPortal>
        <ComboboxPositioner>
          <ComboboxPopup
            aria-busy={isPending || undefined}
            className="border-ink bg-chalk font-kept-mono rounded-none shadow-none"
          >
            <ComboboxStatus className="text-ink-faint text-[10.5px] tracking-[0.05em] lowercase">
              {isPending ? "searching…" : null}
            </ComboboxStatus>
            <ComboboxEmpty className="text-ink-faint text-[10.5px] tracking-[0.05em] lowercase">
              no categories found
            </ComboboxEmpty>
            <ComboboxList>
              {(category: APICategoryListItem) => (
                <ComboboxItem
                  key={category.id}
                  value={category}
                  className="text-ink-2 data-highlighted:bg-ink data-highlighted:text-chalk rounded-none text-[10.5px] tracking-[0.05em] lowercase"
                >
                  {category.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  );
};
