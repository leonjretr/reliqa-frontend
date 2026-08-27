import type { CSSProperties, ReactNode } from "react";

type KeptPhotoProps = {
  category?: string;
  src?: string;
  alt?: string;
  style?: CSSProperties;
  className?: string;
  rounded?: number;
  vignette?: boolean;
};

type Duotone = { hue: string; deep: string };

const DUOTONES: Record<string, Duotone> = {
  cameras: { hue: "#96382a", deep: "#241109" },
  phones: { hue: "#3b4a55", deep: "#0f171c" },
  "record players": { hue: "#63304a", deep: "#1c0c15" },
  kitchen: { hue: "#b3822c", deep: "#2c1e07" },
  sewing: { hue: "#4a5a33", deep: "#141c0d" },
};

const FALLBACK: Duotone = { hue: "#6b5f53", deep: "#1b150f" };

const glyphStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const GLYPHS: Record<string, ReactNode> = {
  cameras: (
    <>
      <path
        d="M6 20h36a3 3 0 0 0 3-3V13a3 3 0 0 0-3-3h-6l-2.5-4h-11L20 10H6a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3Z"
        transform="translate(0 6)"
      />
      <circle cx="24" cy="25" r="8" />
      <circle cx="24" cy="25" r="3.2" />
    </>
  ),
  phones: (
    <>
      <rect x="15" y="6" width="18" height="36" rx="3" />
      <path d="M20 11h8" />
      <circle cx="24" cy="37" r="1.4" />
    </>
  ),
  "record players": (
    <>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="4" />
      <path d="M33 15l6-4" />
    </>
  ),
  kitchen: (
    <>
      <path d="M14 20h14v10a8 8 0 0 1-8 8h0a8 8 0 0 1-8-8V20Z" />
      <path d="M28 23h5a4 4 0 0 1 0 8h-3" />
      <path d="M17 10l-2 6M23 10l-2 6" />
    </>
  ),
  sewing: (
    <>
      <path d="M8 34h22a8 8 0 0 0 8-8V12" />
      <path d="M30 12h8" />
      <path d="M34 12v14" />
      <path d="M8 34v-6" />
    </>
  ),
};

const FALLBACK_GLYPH: ReactNode = (
  <>
    <rect x="10" y="12" width="28" height="24" rx="2" />
    <path d="M10 30l8-7 6 5 6-6 8 8" />
    <circle cx="18" cy="20" r="2.4" />
  </>
);

export const KeptPhoto = ({
  category,
  src,
  alt = "",
  style,
  className,
  rounded = 0,
  vignette = true,
}: KeptPhotoProps) => {
  const tone = (category && DUOTONES[category]) || FALLBACK;
  const glyph = (category && GLYPHS[category]) || FALLBACK_GLYPH;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: rounded,
        background: `linear-gradient(150deg, ${tone.hue} 0%, ${tone.deep} 92%)`,
        color: tone.hue,
        ...style,
      }}
    >
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: tone.hue,
              mixBlendMode: "color",
              opacity: 0.32,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: tone.deep,
              mixBlendMode: "multiply",
              opacity: 0.18,
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(246,241,232,.16)",
          }}
        >
          <svg width="42%" height="42%" viewBox="0 0 48 48" {...glyphStroke}>
            {glyph}
          </svg>
        </div>
      )}
      {vignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 100% at 50% 30%, transparent 40%, rgba(20,14,9,.55) 100%)",
            pointerEvents: "none",
          }}
        />
      )}
      <div className="grain" style={{ opacity: 0.09, zIndex: 2 }} />
    </div>
  );
};
