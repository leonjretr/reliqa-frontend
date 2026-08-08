import { useTranslations } from "next-intl";

import { Link } from "@/i18n";

const NotFound = () => {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{t("TITLE_NOT_FOUND")}</h1>
      <p className="text-muted-foreground">{t("DESCRIPTION_NOT_FOUND")}</p>
      <Link href="/" className="underline underline-offset-4">
        {t("LABEL_BACK_HOME")}
      </Link>
    </div>
  );
};

export default NotFound;
