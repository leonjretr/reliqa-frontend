import { PAGES, STOCK, storyPath, thingPath } from "@/config";
import { Link } from "@/i18n";
import type { APIObjectListItem, APIStoryListItem } from "@/service/types";
import { KeeperAvatar } from "@/ui/components/common/KeeperAvatar";

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
  <div className="bg-chalk px-2.5 py-2.25">
    <div className="text-ink-faint font-kept-mono text-micro mb-0.75 tracking-widest uppercase">
      {label}
    </div>
    <div className="font-kept-mono text-detail font-medium lining-nums tabular-nums">{value}</div>
  </div>
);

export const ProfileScreen = ({ keeper, objects, stories, isOwn }: ProfileScreenProps) => {
  const hasStories = stories.length > 0;
  const hasKept = objects.length > 0;
  const firstName = keeper.name.split(/\s+/)[0];

  return (
    <div className="flex h-full flex-col">
      <header className="torn-edge bg-plum text-blush relative flex flex-none items-end gap-3.5 px-5 pt-6.5 pb-5.5">
        <KeeperAvatar name={keeper.name} src={keeper.avatar} size={74} />
        <div className="min-w-0 flex-1 pb-0.5">
          <div className="font-kept-mono text-blush/75 text-eyebrow mb-1.5 tracking-widest uppercase">
            keeper since {keeper.since}
            {keeper.place ? ` · ${keeper.place}` : ""}
          </div>
          <div className="text-heading-lg leading-heading tracking-snug font-bold break-words">
            {keeper.name}
          </div>
        </div>
        {isOwn && (
          <Link
            href={PAGES.SETTINGS}
            aria-label="settings"
            className="border-blush/30 flex size-8.5 flex-none items-center justify-center self-start rounded-full border text-inherit no-underline"
          >
            {SettingsIcon}
          </Link>
        )}
        <div className="grain-texture pointer-events-none absolute inset-0 opacity-5.5 mix-blend-multiply" />
      </header>

      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain px-4.5 py-5">
        {keeper.bio && (
          <p className="text-ink-2 text-copy-lg mb-4.5 leading-normal font-light italic">
            {keeper.bio}
          </p>
        )}

        <div className="bg-ink border-ink mb-5.5 grid grid-cols-3 gap-px border">
          <Stat label="kept" value={String(objects.length)} />
          <Stat label="written" value={String(stories.length)} />
          <Stat label="since" value={keeper.since} />
        </div>

        {hasStories && (
          <>
            <div className="text-ink-faint font-kept-mono text-eyebrow mb-3 tracking-widest uppercase">
              written
            </div>
            <div className="mb-6 flex flex-col gap-2.5">
              {stories.map((story) => (
                <Link
                  key={story.id}
                  href={storyPath(story.id)}
                  className="bg-stock border-ink rounded-paper block border px-3.5 pt-2.75 pb-3.25 no-underline"
                >
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-ink-faint font-kept-mono text-stamp tracking-widest uppercase lining-nums tabular-nums">
                      {yearOf(story.created_at)}
                    </span>
                  </div>
                  <p className="text-ink-2 text-copy leading-quote font-light italic">
                    “{story.short_story || "—"}”
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}

        {hasKept && (
          <>
            <div className="text-ink-faint font-kept-mono text-eyebrow mb-3.5 tracking-widest uppercase">
              on the shelf · {objects.length} things
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {objects.map((object, index) => {
                const stock = STOCK[index % STOCK.length];
                return (
                  <Link
                    key={object.id}
                    href={thingPath(object.id)}
                    className="border-ink rounded-paper shadow-card border px-3 pt-2.75 pb-3 no-underline"
                    style={{
                      background: stock.bg,
                      color: stock.fg,
                      transform: `rotate(${index % 2 ? 2 : -2}deg)`,
                    }}
                  >
                    <div className="font-kept-mono text-micro mb-1.25 tracking-widest uppercase opacity-72">
                      {object.categories[0] ?? ""} · {yearOf(object.created_at)}
                    </div>
                    <div className="text-copy-lg leading-card-lg font-semibold">{object.name}</div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {!hasStories && !hasKept && (
          <div className="border-hair rounded-paper mt-2 border border-dashed px-4 py-6.5 text-center">
            <p className="text-ink-3 text-copy leading-normal font-light">
              {isOwn
                ? "Your shelf is empty. Keep your first thing and its memory."
                : `${firstName} hasn’t kept anything here yet.`}
            </p>
            {isOwn && (
              <Link
                href={PAGES.ADD}
                className="text-oxblood font-kept-mono text-eyebrow mt-2.5 inline-block tracking-widest uppercase no-underline"
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
