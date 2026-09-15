import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/ui/utils";

export const keptButtonVariants = cva(
  "flex w-full cursor-pointer items-center justify-center border font-semibold",
  {
    variants: {
      variant: {
        solid:
          "border-ink bg-ink text-chalk hover:bg-oxblood hover:border-oxblood text-copy h-13 gap-2.25",
        outline: "border-oxblood text-oxblood hover:bg-oxblood hover:text-chalk text-control h-12",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  },
);

type Props = ComponentProps<"button"> & VariantProps<typeof keptButtonVariants>;

export const KeptButton = ({ variant, className, type = "button", ...props }: Props) => (
  <button type={type} className={cn(keptButtonVariants({ variant }), className)} {...props} />
);
