import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

import { THEME_SCALES } from "@/config";

const twMerge = extendTailwindMerge({ extend: { theme: THEME_SCALES } });

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
