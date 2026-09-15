import { createNavigation } from "next-intl/navigation";

import { ROUTING } from "@/config";

export const { Link, redirect, usePathname, useRouter } = createNavigation(ROUTING);
