"use client";

import { useLocale, useTranslations } from "next-intl";
import { GoogleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { startGoogleOauth } from "@/service/actions";
import { Button } from "@/ui/components/lib/shadcn/button";

export const GoogleAuthButton = () => {
  const locale = useLocale();
  const t = useTranslations("Auth");

  const handleClick = async () => {
    await startGoogleOauth(`/${locale}`);
  };

  return (
    <Button type="button" variant="outline" className="w-full" onClick={handleClick}>
      <HugeiconsIcon icon={GoogleIcon} />
      {t("BUTTON_GOOGLE")}
    </Button>
  );
};
