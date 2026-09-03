"use client";

import { useTranslations } from "next-intl";

import { Switch } from "@/ui/components/lib/shadcn/switch";

type Props = {
  isPublic: boolean;
  onChange: (value: boolean) => void;
};

export const VisibilityToggle = ({ isPublic, onChange }: Props) => {
  const t = useTranslations("Auth");

  return (
    <div className="bg-auth-paper-200 flex items-start gap-3.5 rounded-[10px] p-4">
      <Switch checked={isPublic} onCheckedChange={onChange} className="mt-0.5" />
      <div className="flex flex-col gap-[3px]">
        <span className="text-auth-ink-700 text-sm font-medium">
          {isPublic ? t("VISIBILITY_PUBLIC_LABEL") : t("VISIBILITY_PRIVATE_LABEL")}
        </span>
        <span className="text-muted-foreground text-xs leading-[1.45]">
          {isPublic ? t("VISIBILITY_PUBLIC_DESC") : t("VISIBILITY_PRIVATE_DESC")}
        </span>
      </div>
    </div>
  );
};
