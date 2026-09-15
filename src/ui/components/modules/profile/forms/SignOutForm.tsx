import { useLocale, useTranslations } from "next-intl";

import { signOut } from "@/service/actions";
import { KeptButton } from "@/ui/components/common/KeptButton";

export const SignOutForm = () => {
  const t = useTranslations("Settings");
  const locale = useLocale();

  return (
    <form action={signOut.bind(null, locale)}>
      <KeptButton type="submit" variant="outline" className="mt-2.5">
        {t("BUTTON_SIGN_OUT")}
      </KeptButton>
    </form>
  );
};
