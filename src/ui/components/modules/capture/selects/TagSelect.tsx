import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { searchTags } from "@/service/actions";
import type { APITagListItem } from "@/service/types";
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxValue,
} from "@/ui/components/lib/shadcn";
import { useRemoteOptions } from "@/ui/hooks";
import type { TagOption } from "@/ui/types";
import { cn, slugify } from "@/ui/utils";

import { SelectItem } from "./SelectItem";
import { SelectPopup } from "./SelectPopup";
import {
  SELECT_INPUT_CLASS_NAME,
  SELECT_INPUT_GROUP_CLASS_NAME,
  SELECT_TEXT_CLASS_NAME,
} from "./styles";

const LOCAL_TAG_PREFIX = "local:";
const CREATE_TAG_PREFIX = "create:";
const NO_TAGS: APITagListItem[] = [];

const localTag = (slug: string): APITagListItem => ({
  id: `${LOCAL_TAG_PREFIX}${slug}`,
  slug,
  objects_count: 0,
});

const hasSlug = (tags: APITagListItem[], slug: string) => tags.some((tag) => tag.slug === slug);

type Props = {
  inputId: string;
  value: string[];
  onChange: (slugs: string[]) => void;
};

export const TagSelect = ({ inputId, value, onChange }: Props) => {
  const t = useTranslations("Capture");
  const [knownTags, setKnownTags] = useState<Map<string, APITagListItem>>(new Map());
  const [inputValue, setInputValue] = useState("");

  const rememberTags = useCallback((tags: APITagListItem[]) => {
    setKnownTags(
      (previous) => new Map([...previous, ...tags.map((tag) => [tag.slug, tag] as const)]),
    );
  }, []);

  const { results, isPending } = useRemoteOptions({
    query: inputValue,
    fetchOptions: searchTags,
    initialOptions: NO_TAGS,
    onResults: rememberTags,
  });

  const selected = useMemo(
    () => value.map((slug) => knownTags.get(slug) ?? localTag(slug)),
    [value, knownTags],
  );

  const candidateSlug = slugify(inputValue);
  const isCandidateKnown =
    !candidateSlug || hasSlug(results, candidateSlug) || hasSlug(selected, candidateSlug);

  const items = useMemo<TagOption[]>(() => {
    if (!candidateSlug) {
      return [...results, ...selected.filter((tag) => !hasSlug(results, tag.slug))];
    }
    if (isCandidateKnown) {
      return results;
    }
    return [
      ...results,
      {
        id: `${CREATE_TAG_PREFIX}${candidateSlug}`,
        slug: candidateSlug,
        objects_count: 0,
        creatable: inputValue.trim(),
      },
    ];
  }, [results, selected, candidateSlug, isCandidateKnown, inputValue]);

  const handleValueChange = (next: TagOption[]) => {
    const creatable = next.find((tag) => tag.creatable);
    setInputValue("");

    if (!creatable) {
      onChange(next.map((tag) => tag.slug));
      return;
    }

    setKnownTags((previous) =>
      previous.has(creatable.slug)
        ? previous
        : new Map(previous).set(creatable.slug, localTag(creatable.slug)),
    );
    const slugs = next.filter((tag) => !tag.creatable).map((tag) => tag.slug);
    onChange(slugs.includes(creatable.slug) ? slugs : [...slugs, creatable.slug]);
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
      <ComboboxInputGroup className={SELECT_INPUT_GROUP_CLASS_NAME}>
        <ComboboxChips className="gap-1.5">
          <ComboboxValue>
            {(chips: APITagListItem[]) => (
              <>
                {chips.map((tag) => (
                  <ComboboxChip
                    key={tag.slug}
                    aria-label={tag.slug}
                    className={cn(
                      "border-ink text-ink-2 focus-within:bg-ink focus-within:text-chalk rounded-none border bg-transparent",
                      SELECT_TEXT_CLASS_NAME,
                    )}
                  >
                    {tag.slug}
                    <ComboboxChipRemove aria-label={t("LABEL_REMOVE_TAG", { tag: tag.slug })}>
                      ×
                    </ComboboxChipRemove>
                  </ComboboxChip>
                ))}
                <ComboboxInput
                  id={inputId}
                  placeholder={chips.length ? "" : t("PLACEHOLDER_TAG")}
                  className={SELECT_INPUT_CLASS_NAME}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
      </ComboboxInputGroup>
      <SelectPopup isPending={isPending} emptyLabel={t("EMPTY_TAGS")}>
        {(tag: TagOption) => (
          <SelectItem key={tag.id} value={tag}>
            {tag.creatable ? t("BUTTON_CREATE_TAG", { tag: tag.creatable }) : tag.slug}
          </SelectItem>
        )}
      </SelectPopup>
    </Combobox>
  );
};
