import { useTranslations } from "next-intl";

import { MonoLabel } from "@/ui/components/common/MonoLabel";

const ACTION_CLASS = "cursor-pointer disabled:cursor-default disabled:opacity-40";

type Props = {
  canApply: boolean;
  onApply: () => void;
  onCancel: () => void;
};

export const EditorHeader = ({ canApply, onApply, onCancel }: Props) => {
  const t = useTranslations("PhotoEditor");

  return (
    <div className="bg-chalk flex-none px-4.5 pt-3.75 pb-2.25">
      <div className="flex items-baseline justify-between">
        <button type="button" onClick={onCancel} className={ACTION_CLASS}>
          <MonoLabel as="span">{t("BUTTON_CANCEL")}</MonoLabel>
        </button>
        <MonoLabel as="span">{t("TITLE")}</MonoLabel>
        <button type="button" onClick={onApply} disabled={!canApply} className={ACTION_CLASS}>
          <MonoLabel as="span" className="text-oxblood">
            {t("BUTTON_DONE")}
          </MonoLabel>
        </button>
      </div>
      <div className="bg-ink mt-2.25 h-px" />
    </div>
  );
};
