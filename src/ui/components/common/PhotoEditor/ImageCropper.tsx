import "react-advanced-cropper/dist/style.css";

import {
  FixedCropper,
  ImageRestriction,
  type CropperState,
  type FixedCropperRef,
} from "react-advanced-cropper";

import { toCssFilter, type Effects } from "./effects";
import type { ModeConfig } from "./modes";
import type { EditState } from "./storage";

const STENCIL_MARGIN = 20;

const LOCKED_STENCIL = {
  handlers: false,
  lines: false,
  movable: false,
  resizable: false,
};

const fitStencil = (ratio: number) => (state: CropperState) => {
  const width = state.boundary.width - STENCIL_MARGIN * 2;
  const height = state.boundary.height - STENCIL_MARGIN * 2;
  return width / height > ratio
    ? { width: height * ratio, height }
    : { width, height: width / ratio };
};

type Props = {
  src: string;
  config: ModeConfig;
  ratio: number;
  effects: Effects;
  isCropping: boolean;
  initialState: EditState | null;
  onReady: (cropper: FixedCropperRef) => void;
  onUpdate: (cropper: FixedCropperRef) => void;
};

export const ImageCropper = ({
  src,
  config,
  ratio,
  effects,
  isCropping,
  initialState,
  onReady,
  onUpdate,
}: Props) => (
  <FixedCropper
    src={src}
    className="bg-night size-full"
    stencilComponent={config.stencil}
    stencilProps={{ ...LOCKED_STENCIL, aspectRatio: ratio, overlayClassName: "text-night/70" }}
    stencilSize={fitStencil(ratio)}
    imageRestriction={ImageRestriction.stencil}
    backgroundProps={{ style: { filter: toCssFilter(effects) } }}
    backgroundWrapperProps={{ moveImage: isCropping, scaleImage: isCropping }}
    {...(initialState && {
      defaultCoordinates: initialState.coordinates,
      defaultTransforms: initialState.transforms,
    })}
    onReady={onReady}
    onUpdate={onUpdate}
  />
);
