import type { CSSProperties } from "react";
import Image from "next/image";

import { DUOTONES, FALLBACK_DUOTONE, IMAGE_SIZES } from "@/config";
import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { cn, isLocalPreview } from "@/ui/utils";

import { FALLBACK_GLYPH, GLYPH_STROKE, GLYPHS } from "./glyphs";

type Props = {
  category?: string;
  src?: string;
  alt?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  style?: CSSProperties;
  className?: string;
  vignette?: boolean;
};

export const KeptPhoto = ({
  category,
  src,
  alt = "",
  sizes = IMAGE_SIZES.SCREEN,
  loading,
  style,
  className,
  vignette = true,
}: Props) => {
  const tone = (category && DUOTONES[category]) || FALLBACK_DUOTONE;
  const glyph = (category && GLYPHS[category]) || FALLBACK_GLYPH;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `linear-gradient(150deg, ${tone.hue} 0%, ${tone.deep} 92%)`,
        color: tone.hue,
        ...style,
      }}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            loading={loading}
            unoptimized={isLocalPreview(src)}
            className="object-cover"
          />
          <div
            className="absolute inset-0 opacity-32 mix-blend-color"
            style={{ background: tone.hue }}
          />
          <div
            className="absolute inset-0 opacity-18 mix-blend-multiply"
            style={{ background: tone.deep }}
          />
        </>
      ) : (
        <div className="text-chalk/16 absolute inset-0 flex items-center justify-center">
          <svg width="42%" height="42%" viewBox="0 0 48 48" {...GLYPH_STROKE}>
            {glyph}
          </svg>
        </div>
      )}
      {vignette && <div className="vignette pointer-events-none absolute inset-0" />}
      <GrainOverlay className="opacity-9" />
    </div>
  );
};
