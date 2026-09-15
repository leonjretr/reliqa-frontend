import { PAGES } from "@/config";
import { useRouter } from "@/i18n";

export const useEnterApp = () => {
  const router = useRouter();

  return () => {
    router.replace(PAGES.FEED);
    router.refresh();
  };
};
