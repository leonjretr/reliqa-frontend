import type { SegmentedOption } from "@/ui/types";
import { cn } from "@/ui/utils";

type Props<Value extends string> = {
  options: SegmentedOption<Value>[];
  value: Value;
  onChange: (next: Value) => void;
};

export const Segmented = <Value extends string>({ options, value, onChange }: Props<Value>) => (
  <div className="border-ink rounded-paper flex overflow-hidden border">
    {options.map((option, index) => (
      <button
        key={option.value}
        type="button"
        aria-pressed={value === option.value}
        onClick={() => onChange(option.value)}
        className={cn(
          "font-kept-mono text-caption flex-1 px-1.5 py-2.5 tracking-wider lowercase",
          index > 0 && "border-ink border-l",
          value === option.value ? "bg-ink text-chalk" : "text-ink-2 bg-transparent",
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);
