import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { MonoLabel } from "@/ui/components/common/MonoLabel";

type Props = {
  children: ReactNode;
  isOptional?: boolean;
  htmlFor?: string;
  className?: string;
};

export const CaptureLabel = ({ children, isOptional, htmlFor, className }: Props) => {
  const t = useTranslations("Capture");

  return (
    <MonoLabel htmlFor={htmlFor} className={className}>
      {children}
      {isOptional && (
        <>
          {" "}
          <span className="tracking-normal normal-case">{t("LABEL_OPTIONAL")}</span>
        </>
      )}
    </MonoLabel>
  );
};
