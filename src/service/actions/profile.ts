"use server";

import { updateCurrentUser, updateSettings } from "@/service/api";
import { ActionResult, APISettings } from "@/service/types";

import { toActionFailure } from "./result";

export const saveProfile = async (profile: FormData): Promise<ActionResult> => {
  const response = await updateCurrentUser(profile);

  if (!response.success) {
    return toActionFailure(response);
  }

  return { success: true };
};

export const saveSettings = async (patch: Partial<APISettings>): Promise<ActionResult> => {
  const response = await updateSettings(patch);

  if (!response.success) {
    return toActionFailure(response);
  }

  return { success: true };
};
