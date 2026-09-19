import { applyEffects, type Effects } from "./effects";

const OUTPUT_TYPE = "image/jpeg";
const OUTPUT_EXTENSION = "jpg";
const OUTPUT_QUALITY = 0.9;

export const OUTPUT_FILL = "#ffffff";

type ExportOptions = {
  effects: Effects;
  fileName: string;
};

const toOutputName = (fileName: string) =>
  `${fileName.replace(/\.[^.]+$/, "")}.${OUTPUT_EXTENSION}`;

export const exportPhoto = (canvas: HTMLCanvasElement, { effects, fileName }: ExportOptions) =>
  new Promise<File>((resolve, reject) => {
    const name = toOutputName(fileName);
    applyEffects(canvas, effects).toBlob(
      (blob) =>
        blob ? resolve(new File([blob], name, { type: OUTPUT_TYPE })) : reject(new Error(name)),
      OUTPUT_TYPE,
      OUTPUT_QUALITY,
    );
  });
