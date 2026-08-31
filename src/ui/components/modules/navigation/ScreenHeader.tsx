import { Link } from "@/i18n";

type ScreenHeaderProps = {
  section: string;
  right?: string;
  back?: { href: string; label: string };
};

export const ScreenHeader = ({ section, right, back }: ScreenHeaderProps) => {
  return (
    <div className="bg-chalk flex-none px-[18px] pt-[15px] pb-[9px]">
      <div className="flex items-baseline justify-between">
        {back ? (
          <Link href={back.href} className="no-underline">
            <span className="text-oxblood font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              ← {back.label}
            </span>
          </Link>
        ) : (
          <span className="text-[15px] font-bold tracking-[-0.005em]">Reliqa</span>
        )}
        <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
          {section}
        </span>
        <span className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase lining-nums tabular-nums">
          {right ?? ""}
        </span>
      </div>
      <div className="bg-ink mt-[9px] h-px" />
    </div>
  );
};
