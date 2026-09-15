import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { cn } from "@/ui/utils";

const DECADES = [
  { label: "50s", count: 8 },
  { label: "60s", count: 17 },
  { label: "70s", count: 24 },
  { label: "80s", count: 31 },
  { label: "90s", count: 22 },
  { label: "00s", count: 26 },
  { label: "10s", count: 14 },
];

const BAR_SLOTS = 7;
const PEAK_COUNT = Math.max(...DECADES.map((decade) => decade.count));

export const DecadesBand = () => (
  <div className="border-ink bg-ink flex gap-px border">
    {DECADES.map((decade) => {
      const isPeak = decade.count === PEAK_COUNT;
      const bars = Math.round((decade.count / PEAK_COUNT) * BAR_SLOTS) || 1;

      return (
        <div
          key={decade.label}
          className="bg-chalk flex flex-1 flex-col items-center gap-1.25 pt-1.75 pb-1.5"
        >
          <div className="gap-bar-gap flex h-7.5 flex-col-reverse justify-start">
            {Array.from({ length: bars }, (_bar, bar) => (
              <div key={bar} className={cn("h-bar w-4", isPeak ? "bg-oxblood" : "bg-ink-2")} />
            ))}
          </div>
          <MonoLabel as="span" className={cn("text-micro", isPeak && "text-oxblood")}>
            {decade.label}
          </MonoLabel>
        </div>
      );
    })}
  </div>
);
