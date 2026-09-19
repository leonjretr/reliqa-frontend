import type { ComponentProps } from "react";

import { StrokeIcon } from "./StrokeIcon";

type Props = ComponentProps<"svg">;

export const AdjustIcon = (props: Props) => (
  <StrokeIcon {...props}>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </StrokeIcon>
);
