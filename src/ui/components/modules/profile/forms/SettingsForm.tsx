"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { ROUTE_HANDLERS } from "@/config";
import { saveSettings } from "@/service/actions";
import type { APICurrentUser } from "@/service/types";
import { Divider } from "@/ui/components/common/Divider";
import { KeptButton } from "@/ui/components/common/KeptButton";
import { sendFormData, toProfileFormData, toSettingsPatch, toSettingsValues } from "@/ui/utils";
import { settingsSchema, type SettingsValues } from "@/ui/validation";

import { AccountSection } from "../sections/AccountSection";
import { NotificationsSection } from "../sections/NotificationsSection";
import { ProfileFields } from "../sections/ProfileFields";
import { VisibilitySection } from "../sections/VisibilitySection";

type Props = {
  user: APICurrentUser;
};

export const SettingsForm = ({ user }: Props) => {
  const t = useTranslations("Settings");
  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: toSettingsValues(user),
  });
  const { formState, handleSubmit, reset, setError } = form;
  const { dirtyFields, isDirty, isSubmitSuccessful, isSubmitting } = formState;
  const isSaved = isSubmitSuccessful && !isDirty;

  const onSubmit = async (values: SettingsValues) => {
    const [profileResult, settingsResult] = await Promise.all([
      sendFormData(
        ROUTE_HANDLERS.CURRENT_USER,
        "PATCH",
        toProfileFormData(values, Boolean(dirtyFields.avatar)),
      ),
      saveSettings(toSettingsPatch(values)),
    ]);

    if (!profileResult.success || !settingsResult.success) {
      setError("root", { type: "server" });
      return;
    }

    reset(values, { keepIsSubmitSuccessful: true });
  };

  const saveLabel = isSubmitting
    ? t("BUTTON_SAVING")
    : isSaved
      ? t("BUTTON_SAVED")
      : t("BUTTON_SAVE");

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileFields avatarSrc={user.avatar?.src} />
        <Divider className="mt-6" />
        <VisibilitySection />
        <Divider className="mt-4.5" />
        <NotificationsSection />
        <Divider className="mt-4.5" />
        <AccountSection email={user.email} />
        <KeptButton type="submit" disabled={isSubmitting} className="mt-6 disabled:opacity-60">
          {saveLabel}
        </KeptButton>
      </form>
    </FormProvider>
  );
};
