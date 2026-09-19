import type { ComponentProps } from "react";

import { StrokeIcon } from "./StrokeIcon";

type Props = ComponentProps<"svg">;

export const StoreIcon = (props: Props) => (
  <StrokeIcon {...props}>
    <path d="M4 4.5h16l1 4.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
    <path d="M4.5 11v8.5h15V11" />
    <path d="M9.5 19.5V14h5v5.5" />
  </StrokeIcon>
);
