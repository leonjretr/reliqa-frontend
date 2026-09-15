import { Link } from "@/i18n";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import type { Tab } from "@/ui/types";
import { cn } from "@/ui/utils";

type Props = {
  tab: Tab;
};

export const TabItem = ({ tab }: Props) => {
  if (tab.center) {
    return (
      <Link
        href={tab.href}
        className="text-chalk flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-2.25 no-underline"
      >
        <span
          className={cn(
            "text-chalk flex h-8.5 w-8.5 items-center justify-center border",
            tab.isActive ? "bg-oxblood border-oxblood" : "bg-ink border-ink",
          )}
        >
          {tab.icon}
        </span>
        <MonoLabel as="span" className="text-ink-soft text-micro">
          {tab.label}
        </MonoLabel>
      </Link>
    );
  }

  return (
    <Link
      href={tab.href}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1.25 pt-2.25 pb-2.5 no-underline",
        tab.isActive ? "text-ink" : "text-ink-faint",
      )}
    >
      {tab.icon}
      <MonoLabel as="span" className={cn("text-micro", tab.isActive && "text-oxblood")}>
        {tab.label}
      </MonoLabel>
    </Link>
  );
};
