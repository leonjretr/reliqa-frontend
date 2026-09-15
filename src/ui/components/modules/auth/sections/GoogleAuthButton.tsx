import { useLocale, useTranslations } from "next-intl";

import { startGoogleOauth } from "@/service/actions";
import { GoogleIcon } from "@/ui/components/common/icons";
import { Button, FieldSeparator } from "@/ui/components/lib/shadcn";

export const GoogleAuthButton = () => {
  const locale = useLocale();
  const t = useTranslations("Auth");

  const handleClick = async () => {
    await startGoogleOauth(`/${locale}`);
  };

  return (
    <>
      <FieldSeparator className="font-plex-mono text-meta tracking-spaced uppercase">
        {t("LABEL_OR")}
      </FieldSeparator>
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
        className="border-auth-line-strong text-auth-ink-700 hover:bg-auth-ghost-hover rounded-button h-11 w-full gap-2.5 text-sm font-medium"
      >
        <GoogleIcon />
        {t("BUTTON_GOOGLE")}
      </Button>
    </>
  );
};
