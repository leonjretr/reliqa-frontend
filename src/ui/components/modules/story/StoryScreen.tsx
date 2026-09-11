import { Link } from "@/i18n";
import type { APIStoryDetail } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { formatKeeperName } from "@/ui/utils";

type StoryScreenProps = {
  story: APIStoryDetail;
};

const yearOf = (isoDate: string) => String(new Date(isoDate).getFullYear());

const splitParagraphs = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export const StoryScreen = ({ story }: StoryScreenProps) => {
  const keeperName = formatKeeperName(story.created_by);
  const category = story.object.categories[0];
  const paragraphs = splitParagraphs(story.story);
  const quote = paragraphs[0] ?? story.story;

  return (
    <div className="relative flex h-full flex-col">
      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain">
        <div className="relative h-[372px]">
          <KeptPhoto
            category={category}
            src={story.attachments[0]?.file.src ?? undefined}
            alt={`${story.object.name} kept by ${keeperName}`}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,14,9,0.92)_0%,rgba(20,14,9,0.35)_45%,rgba(20,14,9,0.35)_100%)]" />
          <Link href="/" className="absolute top-[15px] left-[18px] z-[2] no-underline">
            <span className="text-chalk font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              ← the feed
            </span>
          </Link>
          <span className="text-chalk/72 font-kept-mono absolute top-[15px] right-[18px] z-[2] text-[9px] tracking-[0.1em] uppercase lining-nums tabular-nums">
            {yearOf(story.created_at)}
          </span>
          <div className="absolute inset-x-0 bottom-0 px-[18px] pb-[18px]">
            {category && (
              <div className="text-chalk/72 font-kept-mono text-[9px] tracking-[0.1em] uppercase">
                {category} · {story.object.name}
              </div>
            )}
            <div className="text-chalk mt-[6px] text-[30px] leading-[1.02] font-bold tracking-[-0.025em]">
              {keeperName}
            </div>
            <p className="text-chalk mt-[10px] text-[18px] leading-[1.4] font-light italic">
              “{quote}”
            </p>
          </div>
        </div>

        <div className="px-[18px] pt-[18px] pb-[24px]">
          <div className="flex items-baseline gap-[9px]">
            <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              {category ?? story.object.name}
            </span>
            <span className="bg-hair h-px flex-1 -translate-y-[3px]" />
            <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase lining-nums tabular-nums">
              written {yearOf(story.created_at)}
            </span>
          </div>

          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-ink-2 text-[17px] leading-[1.62] font-light ${
                index === 0 ? "mt-[16px]" : "mt-[14px]"
              }`}
            >
              {paragraph}
            </p>
          ))}

          <div className="bg-ink border-ink mt-[22px] flex flex-col gap-px border">
            <Link
              href={`/keeper/${story.created_by.username}`}
              className="bg-chalk flex items-baseline justify-between px-[14px] py-[13px] text-inherit no-underline"
            >
              <span className="text-[15px] font-semibold">{keeperName}’s shelf</span>
              <span className="text-oxblood font-kept-mono text-[9px] tracking-[0.1em] uppercase">
                everything kept →
              </span>
            </Link>
            <Link
              href={`/thing/${story.object.id}`}
              className="bg-chalk flex items-baseline justify-between px-[14px] py-[13px] text-inherit no-underline"
            >
              <span className="text-[15px] font-semibold">{story.object.name}</span>
              <span className="text-oxblood font-kept-mono text-[9px] tracking-[0.1em] uppercase">
                everyone who kept one →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
