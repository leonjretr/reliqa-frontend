"use client";

import { useLocale, useTranslations } from "next-intl";

import { startGoogleOauth } from "@/service/actions";
import { GoogleIcon } from "@/ui/components/common/icons";
import { Button } from "@/ui/components/lib/shadcn/button";
import { FieldSeparator } from "@/ui/components/lib/shadcn/field";
import { cn } from "@/ui/utils/shadcn";

import { SHADOW_RAISED, SHADOW_RAISED_HOVER } from "./shadows";

export const GoogleAuthButton = () => {
  const locale = useLocale();
  const t = useTranslations("Auth");

  const handleClick = async () => {
    await startGoogleOauth(`/${locale}`);
  };

  return (
    <>
      <FieldSeparator className="text-muted-foreground text-xs">{t("LABEL_OR")}</FieldSeparator>
      <Button
        type="button"
        variant="ghost"
        onClick={handleClick}
        className={cn(
          "bg-background hover:bg-background h-11 w-full gap-2.5 rounded-xl border-0 text-sm font-medium transition-all hover:-translate-y-0.5",
          SHADOW_RAISED,
          SHADOW_RAISED_HOVER,
        )}
      >
        <GoogleIcon />
        {t("BUTTON_GOOGLE")}
      </Button>
    </>
  );
};
