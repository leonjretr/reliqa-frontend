import type { ComponentProps } from "react";

import { StrokeIcon } from "./StrokeIcon";

type Props = ComponentProps<"svg">;

export const FlipIcon = (props: Props) => (
  <StrokeIcon {...props}>
    <path d="M12 3v18" />
    <path d="M8 7 3 17h5V7Z" />
    <path d="m16 7 5 10h-5V7Z" />
  </StrokeIcon>
);
