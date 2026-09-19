import { del, get, set } from "idb-keyval";
import type { Coordinates, Transforms } from "react-advanced-cropper";

import type { Effects } from "./effects";
import type { AspectId, PhotoEditorMode } from "./modes";

export type EditState = {
  coordinates: Coordinates;
  transforms: Transforms;
  aspect: AspectId;
  effects: Effects;
};

export type SavedEdit = {
  file: File;
  state: EditState;
};

const editKey = (mode: PhotoEditorMode) => `reliqa:photo-editor:${mode}`;

export const loadEdit = (mode: PhotoEditorMode) =>
  get<SavedEdit>(editKey(mode)).then(
    (saved) => saved ?? null,
    () => null,
  );

export const saveEdit = (mode: PhotoEditorMode, edit: SavedEdit) =>
  set(editKey(mode), edit).catch(() => undefined);

export const clearEdit = (mode: PhotoEditorMode) => del(editKey(mode)).catch(() => undefined);
