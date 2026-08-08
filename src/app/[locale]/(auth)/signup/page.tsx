import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n";
import { Separator } from "@/ui/components/lib/shadcn/separator";
import { AuthCard, GoogleAuthButton, SignupForm } from "@/ui/components/modules/auth";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/signup">): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });

  return { title: t("TITLE_SIGNUP") };
};

const Page = () => {
  const t = useTranslations("Auth");

  return (
    <AuthCard
      title={t("TITLE_SIGNUP")}
      description={t("DESCRIPTION_SIGNUP")}
      footer={
        <span>
          {t("LABEL_HAVE_ACCOUNT")}{" "}
          <Link href="/login" className="text-foreground underline underline-offset-4">
            {t("LABEL_LOGIN_LINK")}
          </Link>
        </span>
      }
    >
      <GoogleAuthButton label={t("LABEL_GOOGLE_CONTINUE")} />
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs">{t("LABEL_OR_DIVIDER")}</span>
        <Separator className="flex-1" />
      </div>
      <SignupForm />
    </AuthCard>
  );
};

export default Page;
