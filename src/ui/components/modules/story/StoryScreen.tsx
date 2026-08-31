import { Link } from "@/i18n";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { hasObjectPage, type Story } from "@/ui/components/modules/feed";

type StoryScreenProps = {
  story: Story;
};

export const StoryScreen = ({ story }: StoryScreenProps) => {
  const objectHasPage = hasObjectPage(story.objectSlug);

  return (
    <div className="relative flex h-full flex-col">
      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain">
        <div className="relative h-[372px]">
          <KeptPhoto
            category={story.category}
            src={story.photo}
            alt={`${story.model} kept by ${story.name}`}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,14,9,0.92)_0%,rgba(20,14,9,0.35)_45%,rgba(20,14,9,0.35)_100%)]" />
          <Link href="/" className="absolute top-[15px] left-[18px] z-[2] no-underline">
            <span className="text-chalk font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              ← the feed
            </span>
          </Link>
          <span className="text-chalk/72 font-kept-mono absolute top-[15px] right-[18px] z-[2] text-[9px] tracking-[0.1em] uppercase lining-nums tabular-nums">
            {story.year}
          </span>
          <div className="absolute inset-x-0 bottom-0 px-[18px] pb-[18px]">
            <div className="text-chalk/72 font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              {story.kind} · {story.place} · {story.relation}
            </div>
            <div className="text-chalk mt-[6px] text-[30px] leading-[1.02] font-bold tracking-[-0.025em]">
              {story.name}
            </div>
            <p className="text-chalk mt-[10px] text-[18px] leading-[1.4] font-light italic">
              “{story.text}”
            </p>
          </div>
        </div>

        <div className="px-[18px] pt-[18px] pb-[24px]">
          <div className="flex items-baseline gap-[9px]">
            <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              {story.model}
            </span>
            <span className="bg-hair h-px flex-1 -translate-y-[3px]" />
            <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase lining-nums tabular-nums">
              held {story.held}
            </span>
          </div>

          {story.body.map((paragraph, index) => (
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
              href={`/keeper/${story.keeperSlug}`}
              className="bg-chalk flex items-baseline justify-between px-[14px] py-[13px] text-inherit no-underline"
            >
              <span className="text-[15px] font-semibold">{story.name}’s shelf</span>
              <span className="text-oxblood font-kept-mono text-[9px] tracking-[0.1em] uppercase">
                everything kept →
              </span>
            </Link>
            {objectHasPage && (
              <Link
                href={`/thing/${story.objectSlug}`}
                className="bg-chalk flex items-baseline justify-between px-[14px] py-[13px] text-inherit no-underline"
              >
                <span className="text-[15px] font-semibold">{story.model}</span>
                <span className="text-oxblood font-kept-mono text-[9px] tracking-[0.1em] uppercase">
                  everyone who kept one →
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
