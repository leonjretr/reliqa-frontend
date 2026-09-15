import { useTranslations } from "next-intl";

import type { APICategoryListItem } from "@/service/types";
import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { ScrollBody } from "@/ui/components/common/ScrollBody";
import { ScreenHeader } from "@/ui/components/modules/navigation";

import { CaptureForm } from "./forms";

const CURRENT_STEP = 1;
const TOTAL_STEPS = 1;

type Props = {
  categories: APICategoryListItem[];
  keeperName?: string;
  initialCategory?: string;
};

export const CaptureScreen = ({ categories, keeperName, initialCategory }: Props) => {
  const t = useTranslations("Capture");

  return (
    <div className="bg-chalk relative flex h-full w-full flex-col overflow-hidden">
      <ScreenHeader
        section={t("SECTION_ADD")}
        right={t("STEP", { current: CURRENT_STEP, total: TOTAL_STEPS })}
      />
      <ScrollBody className="px-4.5 pt-3.5 pb-6">
        <CaptureForm
          categories={categories}
          keeperName={keeperName}
          initialCategory={initialCategory}
        />
      </ScrollBody>
      <GrainOverlay />
    </div>
  );
};
