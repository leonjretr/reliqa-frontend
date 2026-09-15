import type { ComponentProps } from "react";

import { StrokeIcon } from "./StrokeIcon";

type Props = ComponentProps<"svg">;

export const LinesIcon = (props: Props) => (
  <StrokeIcon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </StrokeIcon>
);
