import { PAGES, storyPath, thingPath } from "@/config";
import { Link } from "@/i18n";
import type { APIObjectListItem, APIStoryListItem } from "@/service/types";
import { KeeperAvatar } from "@/ui/components/common/KeeperAvatar";
import { STOCK } from "@/ui/components/modules/feed";

type ProfileKeeper = {
  name: string;
  place: string;
  bio?: string;
  avatar?: string;
  since: string;
};

type ProfileScreenProps = {
  keeper: ProfileKeeper;
  objects: APIObjectListItem[];
  stories: APIStoryListItem[];
  isOwn: boolean;
};

const yearOf = (isoDate: string) => String(new Date(isoDate).getFullYear());

const SettingsIcon = (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />
  </svg>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-chalk px-[10px] py-[9px]">
    <div className="text-ink-faint font-kept-mono mb-[3px] text-[8px] tracking-[0.1em] uppercase">
      {label}
    </div>
    <div className="font-kept-mono text-[13px] font-medium lining-nums tabular-nums">{value}</div>
  </div>
);

export const ProfileScreen = ({ keeper, objects, stories, isOwn }: ProfileScreenProps) => {
  const hasStories = stories.length > 0;
  const hasKept = objects.length > 0;
  const firstName = keeper.name.split(/\s+/)[0];

  return (
    <div className="flex h-full flex-col">
      <header className="torn-edge bg-plum relative flex flex-none items-end gap-[14px] px-[20px] pt-[26px] pb-[22px] text-[#f6e9ee]">
        <KeeperAvatar name={keeper.name} src={keeper.avatar} size={74} />
        <div className="min-w-0 flex-1 pb-[2px]">
          <div className="font-kept-mono mb-[6px] text-[9px] tracking-[0.1em] text-[rgba(246,233,238,0.75)] uppercase">
            keeper since {keeper.since}
            {keeper.place ? ` · ${keeper.place}` : ""}
          </div>
          <div className="text-[30px] leading-[1.02] font-bold tracking-[-0.02em] break-words">
            {keeper.name}
          </div>
        </div>
        {isOwn && (
          <Link
            href={PAGES.SETTINGS}
            aria-label="settings"
            className="flex size-[34px] flex-none items-center justify-center self-start rounded-full border border-[rgba(246,233,238,0.3)] text-inherit no-underline"
          >
            {SettingsIcon}
          </Link>
        )}
        <div className="grain-texture pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-multiply" />
      </header>

      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain px-[18px] py-[20px]">
        {keeper.bio && (
          <p className="text-ink-2 mb-[18px] text-[16px] leading-[1.5] font-light italic">
            {keeper.bio}
          </p>
        )}

        <div className="bg-ink border-ink mb-[22px] grid grid-cols-3 gap-px border">
          <Stat label="kept" value={String(objects.length)} />
          <Stat label="written" value={String(stories.length)} />
          <Stat label="since" value={keeper.since} />
        </div>

        {hasStories && (
          <>
            <div className="text-ink-faint font-kept-mono mb-[12px] text-[9px] tracking-[0.1em] uppercase">
              written
            </div>
            <div className="mb-[24px] flex flex-col gap-[10px]">
              {stories.map((story) => (
                <Link
                  key={story.id}
                  href={storyPath(story.id)}
                  className="bg-stock border-ink block rounded-[3px] border px-[14px] pt-[11px] pb-[13px] no-underline"
                >
                  <div className="mb-[6px] flex items-baseline justify-between">
                    <span className="text-ink-faint font-kept-mono text-[8.5px] tracking-[0.1em] uppercase lining-nums tabular-nums">
                      {yearOf(story.created_at)}
                    </span>
                  </div>
                  <p className="text-ink-2 text-[15px] leading-[1.4] font-light italic">
                    “{story.short_story || "—"}”
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}

        {hasKept && (
          <>
            <div className="text-ink-faint font-kept-mono mb-[14px] text-[9px] tracking-[0.1em] uppercase">
              on the shelf · {objects.length} things
            </div>
            <div className="grid grid-cols-2 gap-[14px]">
              {objects.map((object, index) => {
                const stock = STOCK[index % STOCK.length];
                return (
                  <Link
                    key={object.id}
                    href={thingPath(object.id)}
                    className="border-ink rounded-[3px] border px-[12px] pt-[11px] pb-[12px] no-underline shadow-[0_6px_14px_-8px_rgba(31,26,21,0.4)]"
                    style={{
                      background: stock.bg,
                      color: stock.fg,
                      transform: `rotate(${index % 2 ? 2 : -2}deg)`,
                    }}
                  >
                    <div className="font-kept-mono mb-[5px] text-[8px] tracking-[0.1em] uppercase opacity-[0.72]">
                      {object.categories[0] ?? ""} · {yearOf(object.created_at)}
                    </div>
                    <div className="text-[16px] leading-[1.15] font-semibold">{object.name}</div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {!hasStories && !hasKept && (
          <div className="border-hair mt-[8px] rounded-[3px] border border-dashed px-[16px] py-[26px] text-center">
            <p className="text-ink-3 text-[15px] leading-[1.5] font-light">
              {isOwn
                ? "Your shelf is empty. Keep your first thing and its memory."
                : `${firstName} hasn’t kept anything here yet.`}
            </p>
            {isOwn && (
              <Link
                href={PAGES.ADD}
                className="text-oxblood font-kept-mono mt-[10px] inline-block text-[9px] tracking-[0.1em] uppercase no-underline"
              >
                keep something →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
