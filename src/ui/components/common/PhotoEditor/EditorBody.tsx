"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { getAbsoluteZoom } from "advanced-cropper/extensions/absolute-zoom";
import type { FixedCropperRef } from "react-advanced-cropper";

import { MonoLabel } from "@/ui/components/common/MonoLabel";

import { EditorHeader } from "./EditorHeader";
import { EditorSpinner } from "./EditorSpinner";
import { NEUTRAL_EFFECTS } from "./effects";
import { exportPhoto, OUTPUT_FILL } from "./export";
import { ImageCropper } from "./ImageCropper";
import { ASPECTS, PHOTO_EDITOR_MODES, type AspectId, type PhotoEditorMode } from "./modes";
import type { EditState } from "./storage";
import { TOOLS, type ToolId } from "./tools";
import { ToolTabs } from "./ToolTabs";
import { useImageSource } from "./useImageSource";

const QUARTER_TURN_DEGREES = 90;

const isQuarterTurned = (rotate: number) => Math.abs(rotate / QUARTER_TURN_DEGREES) % 2 === 1;

type Props = {
  file: File;
  mode: PhotoEditorMode;
  initialState: EditState | null;
  onApply: (file: File, state: EditState) => void;
  onCancel: () => void;
};

export const EditorBody = ({ file, mode, initialState, onApply, onCancel }: Props) => {
  const t = useTranslations("PhotoEditor");
  const config = PHOTO_EDITOR_MODES[mode];
  const { image, isError } = useImageSource(file);
  const [cropper, setCropper] = useState<FixedCropperRef | null>(null);
  const [toolId, setToolId] = useState<ToolId>(config.tools[0]);
  const [aspect, setAspect] = useState<AspectId>(initialState?.aspect ?? config.aspects[0]);
  const [effects, setEffects] = useState(initialState?.effects ?? NEUTRAL_EFFECTS);
  const [zoom, setZoom] = useState(0);
  const [isTurned, setIsTurned] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const tool = TOOLS[toolId];
  const originalRatio = image && (isTurned ? 1 / image.ratio : image.ratio);
  const ratio = ASPECTS[aspect] ?? originalRatio ?? 1;

  const handleUpdate = (instance: FixedCropperRef) => {
    setZoom(getAbsoluteZoom(instance.getState(), instance.getSettings()));
    setIsTurned(isQuarterTurned(instance.getTransforms().rotate));
  };

  const handleReady = (instance: FixedCropperRef) => {
    setCropper(instance);
    handleUpdate(instance);
  };

  const handleApply = async () => {
    const canvas = cropper?.getCanvas({
      maxWidth: config.maxSide,
      maxHeight: config.maxSide,
      fillColor: OUTPUT_FILL,
    });
    const coordinates = cropper?.getCoordinates();
    if (!cropper || !canvas || !coordinates) return;

    setIsSaving(true);
    try {
      const edited = await exportPhoto(canvas, { effects, fileName: file.name });
      onApply(edited, { coordinates, transforms: cropper.getTransforms(), aspect, effects });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-chalk flex h-full flex-col">
      <EditorHeader
        canApply={Boolean(cropper) && !isSaving}
        onApply={handleApply}
        onCancel={onCancel}
      />

      <div className="bg-night relative min-h-0 flex-1">
        {image ? (
          <ImageCropper
            src={image.src}
            config={config}
            ratio={ratio}
            effects={effects}
            isCropping={tool.isCropping}
            initialState={initialState}
            onReady={handleReady}
            onUpdate={handleUpdate}
          />
        ) : isError ? (
          <div className="flex h-full items-center justify-center px-4.5">
            <MonoLabel as="span" className="text-chalk/60 text-center">
              {t("ERROR_LOAD")}
            </MonoLabel>
          </div>
        ) : (
          <EditorSpinner />
        )}
      </div>

      <div className="h-36 shrink-0 overflow-hidden px-4.5 pt-4">
        {image && (
          <tool.Panel
            src={image.src}
            cropper={cropper}
            zoom={zoom}
            config={config}
            aspect={aspect}
            onAspect={setAspect}
            effects={effects}
            onEffects={setEffects}
          />
        )}
      </div>

      <ToolTabs tools={config.tools} active={toolId} onChange={setToolId} />
    </div>
  );
};
