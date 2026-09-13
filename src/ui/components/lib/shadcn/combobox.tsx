"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";

import { cn } from "@/ui/utils/shadcn";

function Combobox<Value, Multiple extends boolean | undefined = false>({
  ...props
}: ComboboxPrimitive.Root.Props<Value, Multiple>) {
  return <ComboboxPrimitive.Root data-slot="combobox" {...props} />;
}

const ComboboxValue = ComboboxPrimitive.Value;

function ComboboxInputGroup({ className, ...props }: ComboboxPrimitive.InputGroup.Props) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input-group"
      className={cn(
        "border-input bg-background focus-within:ring-ring/40 flex min-h-9 w-full flex-wrap items-center gap-1 rounded-md border px-3 py-1.5 outline-none focus-within:ring-2 has-[button]:px-1.5",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      className={cn(
        "text-foreground placeholder:text-muted-foreground h-7 min-w-16 flex-1 border-0 bg-transparent p-0 text-sm outline-none",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxPortal(props: ComboboxPrimitive.Portal.Props) {
  return <ComboboxPrimitive.Portal {...props} />;
}

function ComboboxPositioner({ className, ...props }: ComboboxPrimitive.Positioner.Props) {
  return (
    <ComboboxPrimitive.Positioner
      data-slot="combobox-positioner"
      className={cn("z-50 outline-none", className)}
      sideOffset={4}
      {...props}
    />
  );
}

function ComboboxPopup({ className, ...props }: ComboboxPrimitive.Popup.Props) {
  return (
    <ComboboxPrimitive.Popup
      data-slot="combobox-popup"
      className={cn(
        "bg-popover text-popover-foreground border-border w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-md border shadow-md transition-[scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "max-h-[min(var(--available-height),18rem)] overflow-y-auto overscroll-contain p-1",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({ className, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn("text-muted-foreground px-2 py-1.5 text-sm", className)}
      {...props}
    />
  );
}

function ComboboxStatus({ className, ...props }: ComboboxPrimitive.Status.Props) {
  return (
    <ComboboxPrimitive.Status
      data-slot="combobox-status"
      className={cn("text-muted-foreground px-2 py-1.5 text-sm", className)}
      {...props}
    />
  );
}

function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn("flex w-full flex-wrap items-center gap-1", className)}
      {...props}
    />
  );
}

function ComboboxChip({ className, ...props }: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "bg-accent text-accent-foreground flex min-h-6 cursor-default items-center gap-1 rounded-sm py-0 pr-1 pl-2 text-sm outline-none",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxChipRemove({ className, ...props }: ComboboxPrimitive.ChipRemove.Props) {
  return (
    <ComboboxPrimitive.ChipRemove
      data-slot="combobox-chip-remove"
      className={cn(
        "hover:bg-muted flex size-4 items-center justify-center rounded-sm border-0 bg-transparent p-0 text-inherit",
        className,
      )}
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxValue,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxStatus,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
};
