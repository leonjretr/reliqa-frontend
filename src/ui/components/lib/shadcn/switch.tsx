"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/ui/utils/shadcn";

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group focus-visible:ring-ring/40 data-[checked]:bg-primary bg-auth-paper-400 peer inline-flex h-[26px] w-11 shrink-0 cursor-pointer items-center rounded-full p-[3px] transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="shadow-auth-plate pointer-events-none block size-5 rounded-full bg-white transition-transform duration-200 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-data-[checked]:translate-x-[18px] group-data-[unchecked]:translate-x-0 motion-reduce:transition-none"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
