import type { ActionResult } from "./actions";

export type CaptureInput = {
  name: string;
  category: string;
  tags: string[];
  story: string;
  shortStory: string;
  source: string;
  location: string;
  acquiredAt: string | null;
  previousOwner: string;
  isPrivate: boolean;
};

export type CaptureResult = ActionResult<{ objectId: string }>;
