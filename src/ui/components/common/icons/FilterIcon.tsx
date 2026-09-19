import type { ComponentProps } from "react";

import { StrokeIcon } from "./StrokeIcon";

type Props = ComponentProps<"svg">;

export const FilterIcon = (props: Props) => (
  <StrokeIcon {...props}>
    <circle cx="12" cy="8.5" r="5" />
    <circle cx="8.5" cy="14.5" r="5" />
    <circle cx="15.5" cy="14.5" r="5" />
  </StrokeIcon>
);
