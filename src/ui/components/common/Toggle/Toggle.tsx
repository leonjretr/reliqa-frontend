import { cn } from "@/ui/utils";

type Props = {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
};

export const Toggle = ({ label, hint, checked, onChange }: Props) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="border-hair flex w-full items-center justify-between gap-3 border-b py-3.25 text-left last:border-b-0"
  >
    <span className="min-w-0">
      <span className="text-copy block font-medium">{label}</span>
      {hint && <span className="text-ink-3 text-hint leading-quote mt-0.5 block">{hint}</span>}
    </span>
    <span
      className={cn(
        "relative h-5.5 w-9.5 flex-none rounded-full border transition-colors",
        checked ? "bg-oxblood border-oxblood" : "bg-stock-2 border-ink",
      )}
    >
      <span
        className={cn(
          "bg-chalk absolute top-0.5 h-4 w-4 rounded-full transition-[left]",
          checked ? "left-4.5" : "left-0.5",
        )}
      />
    </span>
  </button>
);
