import { Link } from "@/i18n";

type Props = {
  section: string;
  right?: string;
  back?: { href: string; label: string };
};

export const ScreenHeader = ({ section, right, back }: Props) => {
  return (
    <div className="bg-chalk flex-none px-4.5 pt-3.75 pb-2.25">
      <div className="flex items-baseline justify-between">
        {back ? (
          <Link href={back.href} className="no-underline">
            <span className="text-oxblood font-kept-mono text-eyebrow tracking-widest uppercase">
              ← {back.label}
            </span>
          </Link>
        ) : (
          <span className="text-copy tracking-brand font-bold">Reliqa</span>
        )}
        <span className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
          {section}
        </span>
        <span className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase lining-nums tabular-nums">
          {right ?? ""}
        </span>
      </div>
      <div className="bg-ink mt-2.25 h-px" />
    </div>
  );
};
