import { useEffect, useState } from "react";

import type { PhotoEditorMode } from "./modes";
import { loadEdit, saveEdit, type EditState, type SavedEdit } from "./storage";

export const useSavedEdit = (mode: PhotoEditorMode) => {
  const [saved, setSaved] = useState<SavedEdit | null>(null);
  const [draft, setDraft] = useState<File | null>(null);

  useEffect(() => {
    let isActive = true;
    loadEdit(mode).then((loaded) => {
      if (isActive && loaded) setSaved((current) => current ?? loaded);
    });
    return () => {
      isActive = false;
    };
  }, [mode]);

  const file = draft ?? saved?.file ?? null;
  const initialState = draft ? null : (saved?.state ?? null);

  const apply = (state: EditState) => {
    if (!file) return;
    const edit = { file, state };
    setSaved(edit);
    setDraft(null);
    saveEdit(mode, edit);
  };

  return {
    file,
    initialState,
    hasEdit: Boolean(saved),
    start: setDraft,
    apply,
    discard: () => setDraft(null),
  };
};
