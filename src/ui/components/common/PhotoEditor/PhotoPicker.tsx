"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";

import { APP_FRAME_SELECTOR } from "@/config";

import type { PhotoEditorMode } from "./modes";
import { PhotoEditor } from "./PhotoEditor";
import type { EditState } from "./storage";
import { useSavedEdit } from "./useSavedEdit";

type Controls = {
  pick: () => void;
  edit?: () => void;
};

type Props = {
  mode: PhotoEditorMode;
  onChange: (file: File) => void;
  children: (controls: Controls) => ReactNode;
};

export const PhotoPicker = ({ mode, onChange, children }: Props) => {
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { file, initialState, hasEdit, start, apply, discard } = useSavedEdit(mode);
  const container = input?.closest<HTMLElement>(APP_FRAME_SELECTOR) ?? null;

  const pick = () => input?.click();

  const edit = () => setIsEditing(true);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0];
    event.target.value = "";
    if (!picked) return;
    start(picked);
    edit();
  };

  const handleApply = (edited: File, state: EditState) => {
    setIsEditing(false);
    apply(state);
    onChange(edited);
  };

  const handleCancel = () => {
    setIsEditing(false);
    discard();
  };

  return (
    <>
      <input ref={setInput} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {children({ pick, edit: hasEdit ? edit : undefined })}
      {file && (
        <PhotoEditor
          file={file}
          mode={mode}
          container={container}
          initialState={initialState}
          open={isEditing}
          onApply={handleApply}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};
