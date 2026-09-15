import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { keeperPath, PAGES, QUERIES } from "@/config";
import { usePathname } from "@/i18n";
import { GridIcon, HouseIcon, PlusIcon, SearchIcon, UserIcon } from "@/ui/components/common/icons";
import type { Tab } from "@/ui/types";

const ICON_CLASS_NAME = "size-4.5";

const startsWithAny = (pathname: string, prefixes: string[]) =>
  prefixes.some((prefix) => pathname.startsWith(prefix));

export const useTabs = (profileSlug: string | null): Tab[] => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = pathname.startsWith(PAGES.BROWSE) ? searchParams.get(QUERIES.CATEGORY) : null;

  return [
    {
      href: PAGES.FEED,
      label: t("TAB_FEED"),
      icon: <HouseIcon className={ICON_CLASS_NAME} />,
      isActive: pathname === PAGES.FEED,
    },
    {
      href: PAGES.BROWSE,
      label: t("TAB_BROWSE"),
      icon: <GridIcon className={ICON_CLASS_NAME} />,
      isActive: startsWithAny(pathname, [PAGES.BROWSE, PAGES.THING]),
    },
    {
      href: category
        ? `${PAGES.ADD}?${QUERIES.CATEGORY}=${encodeURIComponent(category)}`
        : PAGES.ADD,
      label: t("TAB_KEEP"),
      icon: <PlusIcon className={ICON_CLASS_NAME} />,
      isActive: pathname.startsWith(PAGES.ADD),
      center: true,
    },
    {
      href: PAGES.SEARCH,
      label: t("TAB_FIND"),
      icon: <SearchIcon className={ICON_CLASS_NAME} />,
      isActive: pathname.startsWith(PAGES.SEARCH),
    },
    {
      href: profileSlug ? keeperPath(profileSlug) : PAGES.LOGIN,
      label: t("TAB_SHELF"),
      icon: <UserIcon className={ICON_CLASS_NAME} />,
      isActive: startsWithAny(pathname, [PAGES.KEEPER, PAGES.STORY]),
    },
  ];
};
