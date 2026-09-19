"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Dialog } from "@base-ui/react/dialog";

import { GrainOverlay } from "@/ui/components/common/GrainOverlay";

import { EditorSpinner } from "./EditorSpinner";
import type { PhotoEditorMode } from "./modes";
import type { EditState } from "./storage";

const EditorBody = dynamic(() => import("./EditorBody").then((module) => module.EditorBody), {
  ssr: false,
  loading: EditorSpinner,
});

type Props = {
  file: File;
  mode: PhotoEditorMode;
  container: HTMLElement | null;
  initialState: EditState | null;
  open: boolean;
  onApply: (file: File, state: EditState) => void;
  onCancel: () => void;
};

export const PhotoEditor = ({
  file,
  mode,
  container,
  initialState,
  open,
  onApply,
  onCancel,
}: Props) => {
  const t = useTranslations("PhotoEditor");

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <Dialog.Portal container={container}>
        <Dialog.Popup className="bg-chalk absolute inset-0 z-50 outline-none">
          <Dialog.Title className="sr-only">{t("TITLE")}</Dialog.Title>
          <EditorBody
            file={file}
            mode={mode}
            initialState={initialState}
            onApply={onApply}
            onCancel={onCancel}
          />
          <GrainOverlay />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
