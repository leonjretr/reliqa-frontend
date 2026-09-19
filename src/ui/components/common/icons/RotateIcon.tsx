import type { ComponentProps } from "react";

import { StrokeIcon } from "./StrokeIcon";

type Props = ComponentProps<"svg">;

export const RotateIcon = (props: Props) => (
  <StrokeIcon {...props}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </StrokeIcon>
);
