import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n";
import { Alert, AlertDescription } from "@/ui/components/lib/shadcn/alert";
import { Separator } from "@/ui/components/lib/shadcn/separator";
import { AuthCard, GoogleAuthButton, LoginForm } from "@/ui/components/modules/auth";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/login">): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });

  return { title: t("TITLE_LOGIN") };
};

const Page = async ({ params, searchParams }: PageProps<"/[locale]/login">) => {
  const { locale } = await params;
  const { error } = await searchParams;
  const t = await getTranslations({ locale, namespace: "Auth" });

  return (
    <AuthCard
      title={t("TITLE_LOGIN")}
      description={t("DESCRIPTION_LOGIN")}
      footer={
        <span>
          {t("LABEL_NO_ACCOUNT")}{" "}
          <Link href="/signup" className="text-foreground underline underline-offset-4">
            {t("LABEL_SIGNUP_LINK")}
          </Link>
        </span>
      }
    >
      {error === "google_oauth_failed" && (
        <Alert variant="destructive">
          <AlertDescription>{t("ERROR_GOOGLE_OAUTH_FAILED")}</AlertDescription>
        </Alert>
      )}
      <GoogleAuthButton label={t("LABEL_GOOGLE_CONTINUE")} />
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs">{t("LABEL_OR_DIVIDER")}</span>
        <Separator className="flex-1" />
      </div>
      <LoginForm />
    </AuthCard>
  );
};

export default Page;
