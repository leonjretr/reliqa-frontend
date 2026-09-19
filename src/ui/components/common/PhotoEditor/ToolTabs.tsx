import { useTranslations } from "next-intl";

import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { cn } from "@/ui/utils";

import { TOOLS, type ToolId } from "./tools";

type Props = {
  tools: ToolId[];
  active: ToolId;
  onChange: (tool: ToolId) => void;
};

export const ToolTabs = ({ tools, active, onChange }: Props) => {
  const t = useTranslations("PhotoEditor");

  return (
    <nav className="border-ink bg-chalk flex flex-none items-stretch border-t pb-[env(safe-area-inset-bottom)]">
      {tools.map((id) => {
        const { Icon, labelKey } = TOOLS[id];
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(id)}
            className={cn(
              "flex flex-1 cursor-pointer flex-col items-center justify-center gap-1.25 pt-2.25 pb-2.5",
              isActive ? "text-ink" : "text-ink-faint",
            )}
          >
            <Icon className="size-4.5" />
            <MonoLabel as="span" className={cn("text-micro", isActive && "text-oxblood")}>
              {t(labelKey)}
            </MonoLabel>
          </button>
        );
      })}
    </nav>
  );
};
