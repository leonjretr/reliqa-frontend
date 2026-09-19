import { Slider } from "@base-ui/react/slider";

import { MonoLabel } from "@/ui/components/common/MonoLabel";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

export const EditorSlider = ({ label, value, min, max, step, onChange }: Props) => (
  <Slider.Root
    value={value}
    min={min}
    max={max}
    step={step}
    onValueChange={onChange}
    className="flex items-center gap-3"
  >
    <MonoLabel as="span" className="w-22 shrink-0">
      {label}
    </MonoLabel>
    <Slider.Control className="flex h-8 flex-1 touch-none items-center">
      <Slider.Track className="bg-stock-3 relative h-px w-full">
        <Slider.Indicator className="bg-ink absolute h-px" />
        <Slider.Thumb
          aria-label={label}
          className="border-ink bg-chalk size-4 rounded-full border outline-none"
        />
      </Slider.Track>
    </Slider.Control>
  </Slider.Root>
);
