"use client";

import { useState, type ChangeEvent } from "react";

import { useRouter } from "@/i18n";
import { submitCapture } from "@/service/actions";
import type { ActionResult, APICategoryListItem } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { Spinner } from "@/ui/components/lib/shadcn/spinner";
import { cn } from "@/ui/utils/shadcn";

import { CategoryPicker } from "./CategoryPicker";
import { TagPicker } from "./TagPicker";

const CAP = 140;
const ARRIVALS = ["inherited", "bought", "a gift", "found at home", "made it"];

const uploadStoryPhoto = async (storyId: string, file: File): Promise<ActionResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`/api/stories/${storyId}/attachments`, {
    method: "POST",
    body: formData,
  });

  return (await response.json()) as ActionResult;
};

const fieldClassName =
  "text-ink placeholder:text-ink-faint border-ink w-full border-0 border-b bg-transparent pt-[7px] pb-[6px] text-[17px] outline-none placeholder:font-light placeholder:italic";

const textareaClassName =
  "text-ink placeholder:text-ink-faint bg-stock border-ink w-full resize-none border px-[12px] py-[11px] text-[15.5px] leading-[1.5] font-light outline-none placeholder:italic focus:bg-white";

type CaptureFormProps = {
  categories: APICategoryListItem[];
  keeperName: string;
};

export const CaptureForm = ({ categories, keeperName }: CaptureFormProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug ?? "");
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

  const remaining = CAP - memory.length;
  const held = year ? new Date().getFullYear() - Number(year) : "—";
  const longWords = longread.trim() ? longread.trim().split(/\s+/).length : 0;
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

    const uploadResult = await uploadStoryPhoto(result.storyId, photoFile);

    if (!uploadResult.success) {
      setIsSubmitting(false);
      setError(
        uploadResult.errors?.[0]?.detail ?? "Something went wrong uploading your photo. Try again.",
      );
      return;
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <div className="bg-chalk relative flex h-full w-full flex-col overflow-hidden">
      <div className="grain-texture pointer-events-none absolute inset-0 z-40 opacity-[0.055] mix-blend-multiply" />
      <div className="flex-none px-[18px] pt-[15px] pb-[9px]">
        <div className="flex items-baseline justify-between">
          <span className="text-[15px] font-bold">Reliqa</span>
          <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
            add yours
          </span>
          <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase lining-nums tabular-nums">
            1 of 1
          </span>
        </div>
        <div className="bg-ink mt-[9px] h-px" />
      </div>
      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain px-[18px] pt-[14px] pb-[24px]">
        <div className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
          the thing
        </div>
        <input
          className="text-ink placeholder:text-ink-faint border-ink mt-[5px] w-full border-0 border-b bg-transparent pb-[7px] text-[26px] font-bold tracking-[-0.025em] outline-none placeholder:font-light placeholder:italic"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="what is it?"
        />

        <div className="text-ink-faint font-kept-mono mt-[20px] text-[9px] tracking-[0.1em] uppercase">
          category
        </div>
        <div className="mt-[7px]">
          <CategoryPicker categories={categories} value={categorySlug} onChange={setCategorySlug} />
        </div>

        <div className="text-ink-faint font-kept-mono mt-[20px] text-[9px] tracking-[0.1em] uppercase">
          tags <span className="tracking-normal normal-case">— optional</span>
        </div>
        <div className="mt-[7px]">
          <TagPicker value={tags} onChange={setTags} />
        </div>

        <div className="text-ink-faint font-kept-mono mt-[20px] text-[9px] tracking-[0.1em] uppercase">
          a photo of your object
        </div>
        <label className="mt-[8px] block cursor-pointer">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          {photo ? (
            <div className="border-ink relative h-[214px] border">
              <KeptPhoto
                category={categorySlug}
                src={photo}
                alt="your object"
                className="absolute inset-0"
              />
              <span className="text-chalk font-kept-mono absolute right-[8px] bottom-[8px] bg-[rgba(20,14,9,0.6)] px-[8px] py-[5px] text-[9px] tracking-[0.1em] uppercase">
                replace
              </span>
            </div>
          ) : (
            <div className="bg-stock-2 border-ink flex h-[214px] flex-col items-center justify-center gap-[10px] border border-dashed">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-ink-faint"
              >
                <path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
                add a photograph
              </span>
            </div>
          )}
        </label>
        <p className="text-ink-3 font-kept-mono mt-[8px] text-[10.5px] leading-[1.6]">
          One clear photo of the actual object — the one your story is about. Yours, not a stock
          picture. This is what people see first.
        </p>

        <div className="text-ink-faint font-kept-mono mt-[22px] text-[9px] tracking-[0.1em] uppercase">
          how it reached you
        </div>
        <div className="mt-[7px] flex flex-wrap gap-[6px]">
          {ARRIVALS.map((option) => (
            <button
              key={option}
              onClick={() => setArrival(option)}
              className={cn(
                "border-ink font-kept-mono cursor-pointer border px-[11px] py-[9px] text-[10.5px] tracking-[0.05em] lowercase",
                arrival === option
                  ? "bg-ink text-chalk"
                  : "text-ink-2 hover:bg-stock-2 bg-transparent",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="text-ink-faint font-kept-mono mt-[20px] text-[9px] tracking-[0.1em] uppercase">
          whose was it before you <span className="tracking-normal normal-case">— optional</span>
        </div>
        <input
          className={fieldClassName}
          value={previous}
          onChange={(event) => setPrevious(event.target.value)}
          placeholder="a name, or a relation"
        />

        <div className="mt-[20px] flex gap-[14px]">
          <div className="flex-1">
            <div className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              where
            </div>
            <input
              className={fieldClassName}
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              placeholder="city"
            />
          </div>
          <div className="w-[96px]">
            <div className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              since
            </div>
            <input
              className={cn(fieldClassName, "font-kept-mono text-[16px] lining-nums tabular-nums")}
              value={year}
              onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="year"
            />
          </div>
        </div>

        <div className="mt-[22px] flex items-baseline justify-between">
          <div className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
            the one line
          </div>
          <span
            className={cn(
              "font-kept-mono text-[11px] lining-nums tabular-nums",
              remaining < 20 ? "text-oxblood" : "text-ink-faint",
            )}
          >
            {remaining}
          </span>
        </div>
        <div className="mt-[6px]">
          <textarea
            className={cn(textareaClassName, "h-[74px]")}
            maxLength={CAP}
            value={memory}
            onChange={(event) => setMemory(event.target.value)}
            placeholder="Not the history of it. One thing."
          />
        </div>
        <p className="text-ink-3 font-kept-mono mt-[8px] text-[10.5px] leading-[1.6]">
          One hundred and forty characters — the hook that rides on top of your photo in the feed.
        </p>

        <div className="mt-[22px] flex items-baseline justify-between">
          <div className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
            the whole story <span className="tracking-normal normal-case">— optional</span>
          </div>
          <span className="text-ink-faint font-kept-mono text-[11px] lining-nums tabular-nums">
            {longWords} words
          </span>
        </div>
        <div className="mt-[6px]">
          <textarea
            className={cn(textareaClassName, "h-[150px]")}
            value={longread}
            onChange={(event) => setLongread(event.target.value)}
            placeholder="Where you kept it, who it belonged to, the day you almost let it go. Take your time — this is the part people open the story to read."
          />
        </div>

        <div className="bg-ink mt-[20px] h-px" />
        <div className="text-ink-faint font-kept-mono mt-[12px] mb-[7px] text-[9px] tracking-[0.1em] uppercase">
          this is what it becomes
        </div>
        <div className="border-ink relative h-[220px] overflow-hidden border">
          <KeptPhoto
            category={categorySlug}
            src={photo}
            alt="preview"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,14,9,0.92)_0%,rgba(20,14,9,0.4)_45%,rgba(20,14,9,0)_72%)]" />
          <div className="absolute inset-x-0 bottom-0 px-[14px] pb-[14px]">
            <div className="text-chalk/72 font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              {place || "—"} · {previous ? `${previous}’s` : arrival} · {year || "—"}
            </div>
            <div className="text-chalk mt-[5px] text-[20px] font-bold">{name || "—"}</div>
            <p className="text-chalk mt-[8px] text-[15.5px] leading-[1.42] font-light">
              “{memory || "—"}”
            </p>
            {memory && (
              <div className="text-chalk/72 font-kept-mono mt-[6px] text-[9px] tracking-[0.1em] uppercase">
                — {keeperName}
              </div>
            )}
          </div>
        </div>
        <div className="mt-[8px] flex items-baseline gap-[9px]">
          <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
            held {held} years
          </span>
          <span className="bg-hair h-px flex-1 -translate-y-[3px]" />
          <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
            {longread.trim() ? "with a longread" : "computed, not typed"}
          </span>
        </div>
        {error && (
          <p className="text-oxblood font-kept-mono mt-[10px] text-[10.5px] tracking-[0.05em]">
            {error}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="border-ink bg-ink text-chalk hover:bg-oxblood hover:border-oxblood disabled:bg-stock-2 disabled:text-ink-faint disabled:border-hair mt-[18px] flex h-[52px] w-full cursor-pointer items-center justify-center gap-[9px] border text-[15px] font-semibold disabled:cursor-default"
          disabled={!canSubmit}
        >
          {isSubmitting && <Spinner />}
          {isSubmitting ? "Keeping it…" : "Keep it"}
        </button>
      </div>
    </div>
  );
};
