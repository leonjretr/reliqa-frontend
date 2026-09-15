import { useTranslations } from "next-intl";

import { signOut } from "@/service/actions";
import { KeptButton } from "@/ui/components/common/KeptButton";

export const SignOutForm = () => {
  const t = useTranslations("Settings");

  return (
    <form action={signOut}>
      <KeptButton type="submit" variant="outline" className="mt-2.5">
        {t("BUTTON_SIGN_OUT")}
      </KeptButton>
    </form>
  );
};
