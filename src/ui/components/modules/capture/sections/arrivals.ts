import type { CaptureValues } from "@/ui/validation";

export const ARRIVAL_LABEL_KEYS: Record<CaptureValues["arrival"], string> = {
  inherited: "ARRIVAL_INHERITED",
  bought: "ARRIVAL_BOUGHT",
  gift: "ARRIVAL_GIFT",
  found: "ARRIVAL_FOUND",
  made: "ARRIVAL_MADE",
};
