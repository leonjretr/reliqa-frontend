"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";

import { SEARCH_DEBOUNCE_MS } from "@/config";
import { getTags } from "@/service/api";
import type { APITagListItem } from "@/service/types";
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxStatus,
  ComboboxValue,
} from "@/ui/components/lib/shadcn/combobox";
import { useDebouncedValue } from "@/ui/hooks";

type TagOption = APITagListItem & { creatable?: string };

const slugify = (raw: string) =>
  raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

type TagPickerProps = {
  value: string[];
  onChange: (slugs: string[]) => void;
};

export const TagPicker = ({ value, onChange }: TagPickerProps) => {
  const [knownTags, setKnownTags] = useState<Map<string, APITagListItem>>(new Map());
  const [results, setResults] = useState<APITagListItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const debouncedQuery = useDebouncedValue(inputValue.trim(), SEARCH_DEBOUNCE_MS);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    startTransition(async () => {
      const response = await getTags({ query: debouncedQuery || undefined });
      if (requestIdRef.current !== requestId) return;

      if (!response.success) {
        setResults([]);
        return;
      }

      setResults(response.results);
      setKnownTags((prev) => {
        const next = new Map(prev);
        response.results.forEach((tag) => next.set(tag.slug, tag));
        return next;
      });
    });
  }, [debouncedQuery]);

  const selected = useMemo(
    () =>
      value.map((slug) => knownTags.get(slug) ?? { id: `local:${slug}`, slug, objects_count: 0 }),
    [value, knownTags],
  );

  const candidateSlug = slugify(inputValue);
  const hasMatch =
    !candidateSlug ||
    results.some((tag) => tag.slug === candidateSlug) ||
    selected.some((tag) => tag.slug === candidateSlug);

  const items: TagOption[] = useMemo(() => {
    const merged: TagOption[] = [...results];

    if (!candidateSlug) {
      selected.forEach((tag) => {
        if (!merged.some((result) => result.slug === tag.slug)) merged.push(tag);
      });
    }

    if (candidateSlug && !hasMatch) {
      merged.push({
        id: `create:${candidateSlug}`,
        slug: candidateSlug,
        objects_count: 0,
        creatable: inputValue.trim(),
      });
    }

    return merged;
  }, [results, selected, candidateSlug, hasMatch, inputValue]);

  const handleValueChange = (next: TagOption[]) => {
    const creatable = next.find((tag) => tag.creatable);

    if (!creatable) {
      onChange(next.map((tag) => tag.slug));
      setInputValue("");
      return;
    }

    setKnownTags((prev) => {
      if (prev.has(creatable.slug)) return prev;
      const map = new Map(prev);
      map.set(creatable.slug, {
        id: `local:${creatable.slug}`,
        slug: creatable.slug,
        objects_count: 0,
      });
      return map;
    });

    const slugs = next.filter((tag) => !tag.creatable).map((tag) => tag.slug);
    onChange(slugs.includes(creatable.slug) ? slugs : [...slugs, creatable.slug]);
    setInputValue("");
  };

  return (
    <Combobox
      items={items}
      value={selected}
      inputValue={inputValue}
      multiple
      autoHighlight
      itemToStringLabel={(tag: APITagListItem) => tag.slug}
      filter={null}
      onValueChange={handleValueChange}
      onInputValueChange={setInputValue}
    >
      <ComboboxInputGroup className="border-ink font-kept-mono rounded-none border-0 border-b bg-transparent px-0 py-[6px]">
        <ComboboxChips className="gap-[6px]">
          <ComboboxValue>
            {(chips: APITagListItem[]) => (
              <>
                {chips.map((tag) => (
                  <ComboboxChip
                    key={tag.slug}
                    aria-label={tag.slug}
                    className="border-ink text-ink-2 focus-within:bg-ink focus-within:text-chalk rounded-none border bg-transparent text-[10.5px] tracking-[0.05em] lowercase"
                  >
                    {tag.slug}
                    <ComboboxChipRemove aria-label={`remove ${tag.slug}`}>×</ComboboxChipRemove>
                  </ComboboxChip>
                ))}
                <ComboboxInput
                  placeholder={chips.length ? "" : "add a tag"}
                  className="text-ink placeholder:text-ink-faint h-auto text-[15px] tracking-[0.02em] lowercase placeholder:font-light placeholder:italic"
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
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
              type to add a tag
            </ComboboxEmpty>
            <ComboboxList>
              {(tag: TagOption) => (
                <ComboboxItem
                  key={tag.id}
                  value={tag}
                  className="text-ink-2 data-highlighted:bg-ink data-highlighted:text-chalk rounded-none text-[10.5px] tracking-[0.05em] lowercase"
                >
                  {tag.creatable ? `add "${tag.creatable}"` : tag.slug}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  );
};
