type FilterFunction = "brightness" | "contrast" | "saturate" | "grayscale" | "sepia";

type FilterStep = {
  filter: FilterFunction;
  amount: number;
};

type ColorMatrix = [number, number, number, number][];

export const FILTER_PRESETS = {
  none: [],
  warm: [
    { filter: "sepia", amount: 0.25 },
    { filter: "saturate", amount: 1.2 },
    { filter: "brightness", amount: 1.05 },
  ],
  faded: [
    { filter: "contrast", amount: 0.85 },
    { filter: "saturate", amount: 0.75 },
    { filter: "brightness", amount: 1.08 },
  ],
  mono: [
    { filter: "grayscale", amount: 1 },
    { filter: "contrast", amount: 1.1 },
  ],
  sepia: [{ filter: "sepia", amount: 0.8 }],
  vivid: [
    { filter: "saturate", amount: 1.45 },
    { filter: "contrast", amount: 1.12 },
  ],
} satisfies Record<string, FilterStep[]>;

export type PresetId = keyof typeof FILTER_PRESETS;

export const PRESET_IDS = Object.keys(FILTER_PRESETS) as PresetId[];

export type Adjustment = "brightness" | "contrast" | "saturation";

export type Effects = Record<Adjustment, number> & { preset: PresetId };

export const NEUTRAL_EFFECTS: Effects = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  preset: "none",
};

const toSteps = (effects: Effects): FilterStep[] => [
  ...FILTER_PRESETS[effects.preset],
  { filter: "brightness", amount: effects.brightness },
  { filter: "contrast", amount: effects.contrast },
  { filter: "saturate", amount: effects.saturation },
];

const isNeutral = ({ filter, amount }: FilterStep) =>
  filter === "grayscale" || filter === "sepia" ? amount === 0 : amount === 1;

export const toCssFilter = (effects: Effects) =>
  toSteps(effects)
    .filter((step) => !isNeutral(step))
    .map(({ filter, amount }) => `${filter}(${amount})`)
    .join(" ") || "none";

const scale = (amount: number, offset = 0): ColorMatrix => [
  [amount, 0, 0, offset],
  [0, amount, 0, offset],
  [0, 0, amount, offset],
];

const LUMA_SATURATE = [0.213, 0.715, 0.072];
const LUMA_GRAYSCALE = [0.2126, 0.7152, 0.0722];
const SEPIA_TONE = [
  [0.393, 0.769, 0.189],
  [0.349, 0.686, 0.168],
  [0.272, 0.534, 0.131],
];

const mixWithIdentity = (target: number[][], keep: number): ColorMatrix =>
  target.map((row, rowIndex) => [
    ...row.map((value, column) => value + ((rowIndex === column ? 1 : 0) - value) * keep),
    0,
  ]) as ColorMatrix;

const toLumaRows = (luma: number[]) => [luma, luma, luma];

const toMatrix = ({ filter, amount }: FilterStep): ColorMatrix => {
  switch (filter) {
    case "brightness":
      return scale(amount);
    case "contrast":
      return scale(amount, (1 - amount) / 2);
    case "saturate":
      return mixWithIdentity(toLumaRows(LUMA_SATURATE), amount);
    case "grayscale":
      return mixWithIdentity(toLumaRows(LUMA_GRAYSCALE), 1 - amount);
    case "sepia":
      return mixWithIdentity(SEPIA_TONE, 1 - amount);
  }
};

const CHANNEL_MAX = 255;

const clampChannel = (value: number) => Math.min(CHANNEL_MAX, Math.max(0, value));

export const applyEffects = (canvas: HTMLCanvasElement, effects: Effects) => {
  const matrices = toSteps(effects)
    .filter((step) => !isNeutral(step))
    .map(toMatrix);
  const context = canvas.getContext("2d");
  if (!matrices.length || !context) return canvas;

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = image.data;

  for (let index = 0; index < pixels.length; index += 4) {
    let red = pixels[index];
    let green = pixels[index + 1];
    let blue = pixels[index + 2];

    for (const [redRow, greenRow, blueRow] of matrices) {
      const nextRed =
        redRow[0] * red + redRow[1] * green + redRow[2] * blue + redRow[3] * CHANNEL_MAX;
      const nextGreen =
        greenRow[0] * red + greenRow[1] * green + greenRow[2] * blue + greenRow[3] * CHANNEL_MAX;
      const nextBlue =
        blueRow[0] * red + blueRow[1] * green + blueRow[2] * blue + blueRow[3] * CHANNEL_MAX;
      red = clampChannel(nextRed);
      green = clampChannel(nextGreen);
      blue = clampChannel(nextBlue);
    }

    pixels[index] = red;
    pixels[index + 1] = green;
    pixels[index + 2] = blue;
  }

  context.putImageData(image, 0, 0);
  return canvas;
};
