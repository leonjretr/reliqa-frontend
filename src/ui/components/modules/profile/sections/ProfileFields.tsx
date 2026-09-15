import type { ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import { BIO_MAX_LENGTH } from "@/config";
import { CharCounter } from "@/ui/components/common/CharCounter";
import { KeeperAvatar } from "@/ui/components/common/KeeperAvatar";
import { KeptInput } from "@/ui/components/common/KeptInput";
import { KeptTextarea } from "@/ui/components/common/KeptTextarea";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { useFilePreview } from "@/ui/hooks";
import type { SettingsValues } from "@/ui/validation";

const FIELD_IDS = {
  NAME: "settings-name",
  PLACE: "settings-place",
  BIO: "settings-bio",
};

const AVATAR_SIZE = 72;

type Props = {
  avatarSrc?: string;
};

export const ProfileFields = ({ avatarSrc }: Props) => {
  const t = useTranslations("Settings");
  const common = useTranslations("Common");
  const { register, setValue, control } = useFormContext<SettingsValues>();
  const [name, bio, avatar] = useWatch({ control, name: ["name", "bio", "avatar"] });
  const preview = useFilePreview(avatar, avatarSrc);

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setValue("avatar", file, { shouldDirty: true });
  };

  return (
    <>
      <MonoLabel className="mt-6 mb-2.5">{t("TITLE_PROFILE")}</MonoLabel>
      <div className="flex items-center gap-4">
        <KeeperAvatar name={name} src={preview} size={AVATAR_SIZE} />
        <label className="cursor-pointer">
          <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
          <span className="border-ink font-kept-mono text-caption inline-block border px-3 py-2.25 tracking-wider lowercase">
            {t("BUTTON_CHANGE_PHOTO")}
          </span>
        </label>
      </div>

      <div className="mt-4.5">
        <MonoLabel htmlFor={FIELD_IDS.NAME}>{t("LABEL_NAME")}</MonoLabel>
        <KeptInput id={FIELD_IDS.NAME} {...register("name")} placeholder={t("PLACEHOLDER_NAME")} />
      </div>

      <div className="mt-4.5">
        <MonoLabel htmlFor={FIELD_IDS.PLACE}>{t("LABEL_PLACE")}</MonoLabel>
        <KeptInput
          id={FIELD_IDS.PLACE}
          {...register("place")}
          placeholder={common("PLACEHOLDER_CITY")}
        />
      </div>

      <div className="mt-4.5 flex items-baseline justify-between">
        <MonoLabel htmlFor={FIELD_IDS.BIO}>{t("LABEL_BIO")}</MonoLabel>
        <CharCounter remaining={BIO_MAX_LENGTH - bio.length} />
      </div>
      <div className="mt-1.5">
        <KeptTextarea
          id={FIELD_IDS.BIO}
          {...register("bio")}
          className="h-23"
          maxLength={BIO_MAX_LENGTH}
          placeholder={t("PLACEHOLDER_BIO")}
        />
      </div>
    </>
  );
};
