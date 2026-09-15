import type { ComponentProps } from "react";

import { StrokeIcon } from "./StrokeIcon";

type Props = ComponentProps<"svg">;

export const PlusIcon = (props: Props) => (
  <StrokeIcon {...props}>
    <path d="M12 5v14M5 12h14" />
  </StrokeIcon>
);
