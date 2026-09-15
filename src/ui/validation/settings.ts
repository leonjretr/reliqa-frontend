import { z } from "zod";

import { BIO_MAX_LENGTH, ROUTING } from "@/config";

export const VISIBILITIES = ["everyone", "private"] as const;

export const settingsSchema = z.object({
  name: z.string(),
  place: z.string(),
  bio: z.string().max(BIO_MAX_LENGTH),
  avatar: z.instanceof(File).nullable(),
  username: z.string(),
  visibility: z.enum(VISIBILITIES),
  isPlaceVisible: z.boolean(),
  isNotifyingKept: z.boolean(),
  isNotifyingThemes: z.boolean(),
  language: z.enum(ROUTING.locales),
});

export type SettingsValues = z.infer<typeof settingsSchema>;
