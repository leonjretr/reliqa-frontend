import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";

import { ONESIGNAL_APP_ID, ROUTING, UMAMI_URL, UMAMI_WEBSITE_ID } from "@/config";
import { loadCurrentUserId } from "@/service/actions";
import { OneSignalProvider, UmamiProvider } from "@/ui/components/common/providers";

export const generateStaticParams = () => ROUTING.locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: Omit<LayoutProps<"/[locale]">, "children">): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Layout" });

  return {
    title: t("TITLE_SITE"),
    description: t("DESCRIPTION_SITE"),
  };
};

const Layout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!hasLocale(ROUTING.locales, locale)) {
    notFound();
  }

  const userId = await loadCurrentUserId();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <OneSignalProvider appId={ONESIGNAL_APP_ID} userId={userId} />
      </body>
      <UmamiProvider url={UMAMI_URL} websiteId={UMAMI_WEBSITE_ID} />
    </html>
  );
};

export default Layout;
