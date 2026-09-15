import { INITIALS_LENGTH } from "@/config";
import { cn } from "@/ui/utils/shadcn";

type KeeperAvatarProps = {
  name: string;
  src?: string;
  size?: number;
  className?: string;
};

const TONES = ["#96382a", "#b3822c", "#63304a", "#4a5a33", "#3b4a55"];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, INITIALS_LENGTH)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const toneFor = (name: string) => {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0);
  return TONES[sum % TONES.length];
};

export const KeeperAvatar = ({ name, src, size = 64, className }: KeeperAvatarProps) => {
  const tone = toneFor(name);

  return (
    <div
      className={cn(
        "border-ink relative flex flex-none items-center justify-center overflow-hidden rounded-full border shadow-[0_6px_14px_-8px_rgba(31,26,21,0.5)]",
        className,
      )}
      style={{ width: size, height: size, background: tone }}
    >
      {src ? (
        <img src={src} alt={name} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span
          className="font-bold tracking-[-0.02em] text-[#f6e9ee]"
          style={{ fontSize: size * 0.4 }}
        >
          {initials(name)}
        </span>
      )}
      <div className="grain-texture pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-multiply" />
    </div>
  );
};
