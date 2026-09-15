import Image from "next/image";

import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { cn, getInitials, isLocalPreview, pickTone } from "@/ui/utils";

type Props = {
  name: string;
  src?: string;
  size?: number;
  className?: string;
};

export const KeeperAvatar = ({ name, src, size = 64, className }: Props) => {
  const tone = pickTone(name);

  return (
    <div
      className={cn(
        "border-ink shadow-avatar relative flex flex-none items-center justify-center overflow-hidden rounded-full border",
        className,
      )}
      style={{ width: size, height: size, background: tone }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={`${size}px`}
          unoptimized={isLocalPreview(src)}
          className="object-cover"
        />
      ) : (
        <span className="text-blush tracking-snug font-bold" style={{ fontSize: size * 0.4 }}>
          {getInitials(name)}
        </span>
      )}
      <GrainOverlay className="opacity-9" />
    </div>
  );
};
