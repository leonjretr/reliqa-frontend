import { keeperPath, PAGES, thingPath } from "@/config";
import { Link } from "@/i18n";
import type { APIStoryDetail } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { PhotoShade } from "@/ui/components/common/PhotoShade";
import { formatKeeperName, formatYear, splitParagraphs } from "@/ui/utils";

type StoryScreenProps = {
  story: APIStoryDetail;
};

export const StoryScreen = ({ story }: StoryScreenProps) => {
  const keeperName = formatKeeperName(story.created_by);
  const category = story.object.categories[0];
  const paragraphs = splitParagraphs(story.story);
  const quote = paragraphs[0] ?? story.story;

  return (
    <div className="relative flex h-full flex-col">
      <div className="kept-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="relative h-93">
          <KeptPhoto
            category={category}
            src={story.attachments[0]?.file.src ?? undefined}
            alt={`${story.object.name} kept by ${keeperName}`}
            className="absolute inset-0"
          />
          <PhotoShade variant="story" />
          <Link href={PAGES.FEED} className="absolute top-3.75 left-4.5 no-underline">
            <span className="text-chalk font-kept-mono text-eyebrow tracking-widest uppercase">
              ← the feed
            </span>
          </Link>
          <span className="text-chalk/72 font-kept-mono text-eyebrow absolute top-3.75 right-4.5 tracking-widest uppercase lining-nums tabular-nums">
            {formatYear(story.created_at)}
          </span>
          <div className="absolute inset-x-0 bottom-0 px-4.5 pb-4.5">
            {category && (
              <div className="text-chalk/72 font-kept-mono text-eyebrow tracking-widest uppercase">
                {category} · {story.object.name}
              </div>
            )}
            <div className="text-chalk text-heading-lg leading-heading mt-1.5 font-bold tracking-tight">
              {keeperName}
            </div>
            <p className="text-chalk text-lede leading-quote mt-2.5 font-light italic">“{quote}”</p>
          </div>
        </div>

        <div className="px-4.5 pt-4.5 pb-6">
          <div className="flex items-baseline gap-2.25">
            <span className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
              {category ?? story.object.name}
            </span>
            <span className="bg-hair h-px flex-1 -translate-y-0.75" />
            <span className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase lining-nums tabular-nums">
              written {formatYear(story.created_at)}
            </span>
          </div>

          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-ink-2 text-field leading-reading font-light ${
                index === 0 ? "mt-4" : "mt-3.5"
              }`}
            >
              {paragraph}
            </p>
          ))}

          <div className="bg-ink border-ink mt-5.5 flex flex-col gap-px border">
            <Link
              href={keeperPath(story.created_by.username)}
              className="bg-chalk flex items-baseline justify-between px-3.5 py-3.25 text-inherit no-underline"
            >
              <span className="text-copy font-semibold">{keeperName}’s shelf</span>
              <span className="text-oxblood font-kept-mono text-eyebrow tracking-widest uppercase">
                everything kept →
              </span>
            </Link>
            <Link
              href={thingPath(story.object.id)}
              className="bg-chalk flex items-baseline justify-between px-3.5 py-3.25 text-inherit no-underline"
            >
              <span className="text-copy font-semibold">{story.object.name}</span>
              <span className="text-oxblood font-kept-mono text-eyebrow tracking-widest uppercase">
                everyone who kept one →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
