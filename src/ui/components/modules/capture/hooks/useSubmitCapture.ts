import { useTranslations } from "next-intl";
import type { UseFormSetError } from "react-hook-form";

import { objectAttachmentsRoute, PAGES, YEAR_MAX_LENGTH } from "@/config";
import { useRouter } from "@/i18n";
import { submitCapture } from "@/service/actions";
import type { ActionFailure } from "@/service/types";
import { sendFormData } from "@/ui/utils";
import type { CaptureValues } from "@/ui/validation";

const ATTACHMENT_FIELD = "file";

const firstErrorDetail = (result: ActionFailure) => result.errors?.[0]?.detail;

const toAcquiredAt = (year: string) => (year.length === YEAR_MAX_LENGTH ? `${year}-01-01` : null);

export const useSubmitCapture = (setError: UseFormSetError<CaptureValues>) => {
  const t = useTranslations("Capture");
  const router = useRouter();

  return async (values: CaptureValues) => {
    const result = await submitCapture({
      name: values.name,
      category: values.category,
      tags: values.tags,
      story: values.story.trim() || values.memory,
      shortStory: values.memory,
      source: values.arrival,
      location: values.place.trim(),
      acquiredAt: toAcquiredAt(values.year),
      previousOwner: values.previousOwner.trim(),
      isPrivate: values.isPrivate,
    });

    if (!result.success) {
      setError("root", { message: firstErrorDetail(result) ?? t("ERROR_SUBMIT") });
      return;
    }

    const attachment = new FormData();
    if (values.photo) attachment.append(ATTACHMENT_FIELD, values.photo);
    const upload = await sendFormData(objectAttachmentsRoute(result.objectId), "POST", attachment);

    if (!upload.success) {
      setError("root", { message: firstErrorDetail(upload) ?? t("ERROR_UPLOAD") });
      return;
    }

    router.replace(PAGES.FEED);
    router.refresh();
  };
};
