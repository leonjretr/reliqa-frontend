import { z } from "zod";

import { SHORT_STORY_MAX_LENGTH } from "@/config";

export const ARRIVALS = ["inherited", "bought", "a-gift", "found-at-home", "made-it"] as const;

export const captureSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()),
  photo: z
    .instanceof(File)
    .nullable()
    .refine((file) => Boolean(file)),
  arrival: z.enum(ARRIVALS),
  previousOwner: z.string(),
  place: z.string(),
  year: z.string(),
  memory: z.string().min(1).max(SHORT_STORY_MAX_LENGTH),
  story: z.string(),
  isPrivate: z.boolean(),
});

export type CaptureValues = z.infer<typeof captureSchema>;
