import { PAGES, type Locale } from "@/config";
import { useRouter } from "@/i18n";

export const useEnterApp = () => {
  const router = useRouter();

  return (locale?: Locale) => {
    router.replace(PAGES.FEED, { locale });
    router.refresh();
  };
};
