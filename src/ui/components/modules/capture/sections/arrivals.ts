import type { CaptureValues } from "@/ui/validation";

export const ARRIVAL_LABEL_KEYS: Record<CaptureValues["arrival"], string> = {
  inherited: "ARRIVAL_INHERITED",
  bought: "ARRIVAL_BOUGHT",
  "a-gift": "ARRIVAL_GIFT",
  "found-at-home": "ARRIVAL_FOUND",
  "made-it": "ARRIVAL_MADE",
};
