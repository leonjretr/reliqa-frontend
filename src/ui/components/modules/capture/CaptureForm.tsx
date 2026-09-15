"use client";

import { useState, type ChangeEvent } from "react";

import {
  CHARACTERS_LOW_THRESHOLD,
  PAGES,
  SHORT_STORY_MAX_LENGTH,
  storyAttachmentsRoute,
  YEAR_MAX_LENGTH,
} from "@/config";
import { useRouter } from "@/i18n";
import { submitCapture } from "@/service/actions";
import type { APICategoryListItem } from "@/service/types";
import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { CameraIcon } from "@/ui/components/common/icons";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { PhotoShade } from "@/ui/components/common/PhotoShade";
import { Spinner } from "@/ui/components/lib/shadcn";
import { cn, countWords, sendFormData, yearsSince } from "@/ui/utils";

import { CategoryPicker } from "./CategoryPicker";
import { TagPicker } from "./TagPicker";

const ARRIVALS = ["inherited", "bought", "a gift", "found at home", "made it"];

const fieldClassName =
  "text-ink placeholder:text-ink-faint border-ink w-full border-0 border-b bg-transparent pt-1.75 pb-1.5 text-field outline-none placeholder:font-light placeholder:italic";

const textareaClassName =
  "text-ink placeholder:text-ink-faint bg-stock border-ink w-full resize-none border px-3 py-2.75 text-reading leading-normal font-light outline-none placeholder:italic focus:bg-white";

type CaptureFormProps = {
  categories: APICategoryListItem[];
  keeperName: string;
  initialCategory?: string;
};

export const CaptureForm = ({ categories, keeperName, initialCategory = "" }: CaptureFormProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState(initialCategory);
  const [tags, setTags] = useState<string[]>([]);
  const [arrival, setArrival] = useState("inherited");
  const [previous, setPrevious] = useState("");
  const [place, setPlace] = useState("");
  const [year, setYear] = useState("");
  const [memory, setMemory] = useState("");
  const [longread, setLongread] = useState("");
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remaining = SHORT_STORY_MAX_LENGTH - memory.length;
  const held = year ? yearsSince(Number(year)) : "—";
  const longWords = countWords(longread);
  const canSubmit = Boolean(name && categorySlug && memory && photoFile && !isSubmitting);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
    setPhotoFile(file);
  };

  const handleSubmit = async () => {
    if (!canSubmit || !photoFile) return;

    setIsSubmitting(true);
    setError(null);

    const result = await submitCapture({
      name,
      category: categorySlug,
      tags,
      story: longread.trim() || memory,
      shortStory: memory,
    });

    if (!result.success) {
      setIsSubmitting(false);
      setError(result.errors?.[0]?.detail ?? "Something went wrong. Try again.");
      return;
    }

    const attachment = new FormData();
    attachment.append("file", photoFile);
    const uploadResult = await sendFormData(
      storyAttachmentsRoute(result.storyId),
      "POST",
      attachment,
    );

    if (!uploadResult.success) {
      setIsSubmitting(false);
      setError(
        uploadResult.errors?.[0]?.detail ?? "Something went wrong uploading your photo. Try again.",
      );
      return;
    }

    router.replace(PAGES.FEED);
    router.refresh();
  };

  return (
    <div className="bg-chalk relative flex h-full w-full flex-col overflow-hidden">
      <div className="flex-none px-4.5 pt-3.75 pb-2.25">
        <div className="flex items-baseline justify-between">
          <span className="text-copy font-bold">Reliqa</span>
          <span className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
            add yours
          </span>
          <span className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase lining-nums tabular-nums">
            1 of 1
          </span>
        </div>
        <div className="bg-ink mt-2.25 h-px" />
      </div>
      <div className="kept-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4.5 pt-3.5 pb-6">
        <div className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
          the thing
        </div>
        <input
          className="text-ink placeholder:text-ink-faint border-ink text-title-lg mt-1.25 w-full border-0 border-b bg-transparent pb-1.75 font-bold tracking-tight outline-none placeholder:font-light placeholder:italic"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="what is it?"
        />

        <div className="text-ink-faint font-kept-mono text-eyebrow mt-5 tracking-widest uppercase">
          category
        </div>
        <div className="mt-1.75">
          <CategoryPicker categories={categories} value={categorySlug} onChange={setCategorySlug} />
        </div>

        <div className="text-ink-faint font-kept-mono text-eyebrow mt-5 tracking-widest uppercase">
          tags <span className="tracking-normal normal-case">— optional</span>
        </div>
        <div className="mt-1.75">
          <TagPicker value={tags} onChange={setTags} />
        </div>

        <div className="text-ink-faint font-kept-mono text-eyebrow mt-5 tracking-widest uppercase">
          a photo of your object
        </div>
        <label className="mt-2 block cursor-pointer">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          {photo ? (
            <div className="border-ink relative h-53.5 border">
              <KeptPhoto
                category={categorySlug}
                src={photo}
                alt="your object"
                className="absolute inset-0"
              />
              <span className="text-chalk font-kept-mono bg-night/60 text-eyebrow absolute right-2 bottom-2 px-2 py-1.25 tracking-widest uppercase">
                replace
              </span>
            </div>
          ) : (
            <div className="bg-stock-2 border-ink flex h-53.5 flex-col items-center justify-center gap-2.5 border border-dashed">
              <CameraIcon className="text-ink-faint size-8.5" strokeWidth={1.4} />
              <span className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
                add a photograph
              </span>
            </div>
          )}
        </label>
        <p className="text-ink-3 font-kept-mono text-caption leading-note mt-2">
          One clear photo of the actual object — the one your story is about. Yours, not a stock
          picture. This is what people see first.
        </p>

        <div className="text-ink-faint font-kept-mono text-eyebrow mt-5.5 tracking-widest uppercase">
          how it reached you
        </div>
        <div className="mt-1.75 flex flex-wrap gap-1.5">
          {ARRIVALS.map((option) => (
            <button
              key={option}
              onClick={() => setArrival(option)}
              className={cn(
                "border-ink font-kept-mono text-caption cursor-pointer border px-2.75 py-2.25 tracking-wider lowercase",
                arrival === option
                  ? "bg-ink text-chalk"
                  : "text-ink-2 hover:bg-stock-2 bg-transparent",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="text-ink-faint font-kept-mono text-eyebrow mt-5 tracking-widest uppercase">
          whose was it before you <span className="tracking-normal normal-case">— optional</span>
        </div>
        <input
          className={fieldClassName}
          value={previous}
          onChange={(event) => setPrevious(event.target.value)}
          placeholder="a name, or a relation"
        />

        <div className="mt-5 flex gap-3.5">
          <div className="flex-1">
            <div className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
              where
            </div>
            <input
              className={fieldClassName}
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              placeholder="city"
            />
          </div>
          <div className="w-24">
            <div className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
              since
            </div>
            <input
              className={cn(fieldClassName, "font-kept-mono text-copy-lg lining-nums tabular-nums")}
              value={year}
              onChange={(event) =>
                setYear(event.target.value.replace(/\D/g, "").slice(0, YEAR_MAX_LENGTH))
              }
              placeholder="year"
            />
          </div>
        </div>

        <div className="mt-5.5 flex items-baseline justify-between">
          <div className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
            the one line
          </div>
          <span
            className={cn(
              "font-kept-mono text-meta lining-nums tabular-nums",
              remaining < CHARACTERS_LOW_THRESHOLD ? "text-oxblood" : "text-ink-faint",
            )}
          >
            {remaining}
          </span>
        </div>
        <div className="mt-1.5">
          <textarea
            className={cn(textareaClassName, "h-18.5")}
            maxLength={SHORT_STORY_MAX_LENGTH}
            value={memory}
            onChange={(event) => setMemory(event.target.value)}
            placeholder="Not the history of it. One thing."
          />
        </div>
        <p className="text-ink-3 font-kept-mono text-caption leading-note mt-2">
          One hundred and forty characters — the hook that rides on top of your photo in the feed.
        </p>

        <div className="mt-5.5 flex items-baseline justify-between">
          <div className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
            the whole story <span className="tracking-normal normal-case">— optional</span>
          </div>
          <span className="text-ink-faint font-kept-mono text-meta lining-nums tabular-nums">
            {longWords} words
          </span>
        </div>
        <div className="mt-1.5">
          <textarea
            className={cn(textareaClassName, "h-37.5")}
            value={longread}
            onChange={(event) => setLongread(event.target.value)}
            placeholder="Where you kept it, who it belonged to, the day you almost let it go. Take your time — this is the part people open the story to read."
          />
        </div>

        <div className="bg-ink mt-5 h-px" />
        <div className="text-ink-faint font-kept-mono text-eyebrow mt-3 mb-1.75 tracking-widest uppercase">
          this is what it becomes
        </div>
        <div className="border-ink relative h-55 overflow-hidden border">
          <KeptPhoto
            category={categorySlug}
            src={photo}
            alt="preview"
            className="absolute inset-0"
          />
          <PhotoShade variant="preview" />
          <div className="absolute inset-x-0 bottom-0 px-3.5 pb-3.5">
            <div className="text-chalk/72 font-kept-mono text-eyebrow tracking-widest uppercase">
              {place || "—"} · {previous ? `${previous}’s` : arrival} · {year || "—"}
            </div>
            <div className="text-chalk text-title-sm mt-1.25 font-bold">{name || "—"}</div>
            <p className="text-chalk text-reading leading-quote-lg mt-2 font-light">
              “{memory || "—"}”
            </p>
            {memory && (
              <div className="text-chalk/72 font-kept-mono text-eyebrow mt-1.5 tracking-widest uppercase">
                — {keeperName}
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2.25">
          <span className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
            held {held} years
          </span>
          <span className="bg-hair h-px flex-1 -translate-y-0.75" />
          <span className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
            {longread.trim() ? "with a longread" : "computed, not typed"}
          </span>
        </div>
        {error && (
          <p className="text-oxblood font-kept-mono text-caption mt-2.5 tracking-wider">{error}</p>
        )}
        <button
          onClick={handleSubmit}
          className="border-ink bg-ink text-chalk hover:bg-oxblood hover:border-oxblood disabled:bg-stock-2 disabled:text-ink-faint disabled:border-hair text-copy mt-4.5 flex h-13 w-full cursor-pointer items-center justify-center gap-2.25 border font-semibold disabled:cursor-default"
          disabled={!canSubmit}
        >
          {isSubmitting && <Spinner />}
          {isSubmitting ? "Keeping it…" : "Keep it"}
        </button>
      </div>
      <GrainOverlay />
    </div>
  );
};
