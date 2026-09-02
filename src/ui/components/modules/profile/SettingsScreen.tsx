"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";

import { Link } from "@/i18n";
import { KeeperAvatar } from "@/ui/components/common/KeeperAvatar";
import { CURRENT_KEEPER_SLUG, type Keeper } from "@/ui/components/modules/feed";
import { ScreenHeader } from "@/ui/components/modules/navigation";
import { cn } from "@/ui/utils/shadcn";

type SettingsScreenProps = {
  keeper: Keeper;
  email: string;
};

const BIO_CAP = 160;

const fieldClassName =
  "text-ink placeholder:text-ink-faint border-ink w-full border-0 border-b bg-transparent pt-[7px] pb-[6px] text-[17px] outline-none placeholder:font-light placeholder:italic";

const textareaClassName =
  "text-ink placeholder:text-ink-faint bg-stock border-ink w-full resize-none border px-[12px] py-[11px] text-[15.5px] leading-[1.5] font-light outline-none placeholder:italic focus:bg-white";

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="text-ink-faint font-kept-mono mt-[24px] mb-[10px] text-[9px] tracking-[0.1em] uppercase">
    {children}
  </div>
);

const FieldLabel = ({ children }: { children: ReactNode }) => (
  <div className="text-ink-faint font-kept-mono text-[9px] tracking-[0.1em] uppercase">
    {children}
  </div>
);

const Toggle = ({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) => (
  <button
    onClick={() => onChange(!checked)}
    className="border-hair flex w-full items-center justify-between gap-[12px] border-b py-[13px] text-left last:border-b-0"
  >
    <span className="min-w-0">
      <span className="block text-[15px] font-medium">{label}</span>
      {hint && (
        <span className="text-ink-3 mt-[2px] block text-[12.5px] leading-[1.4]">{hint}</span>
      )}
    </span>
    <span
      className={cn(
        "relative h-[22px] w-[38px] flex-none rounded-full border transition-colors",
        checked ? "bg-oxblood border-oxblood" : "bg-stock-2 border-ink",
      )}
    >
      <span
        className={cn(
          "bg-chalk absolute top-[2px] h-[16px] w-[16px] rounded-full transition-[left]",
          checked ? "left-[18px]" : "left-[2px]",
        )}
      />
    </span>
  </button>
);

const Segmented = ({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (next: string) => void;
}) => (
  <div className="border-ink flex overflow-hidden rounded-[3px] border">
    {options.map((option, index) => (
      <button
        key={option.value}
        onClick={() => onChange(option.value)}
        className={cn(
          "font-kept-mono flex-1 px-[6px] py-[10px] text-[10.5px] tracking-[0.05em] lowercase",
          index > 0 && "border-ink border-l",
          value === option.value ? "bg-ink text-chalk" : "text-ink-2 bg-transparent",
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export const SettingsScreen = ({ keeper, email }: SettingsScreenProps) => {
  const [name, setName] = useState(keeper.name);
  const [place, setPlace] = useState(keeper.place);
  const [bio, setBio] = useState(keeper.bio ?? "");
  const [avatar, setAvatar] = useState<string | undefined>(keeper.avatar);
  const [username, setUsername] = useState(keeper.slug);
  const [visibility, setVisibility] = useState("everyone");
  const [showPlace, setShowPlace] = useState(true);
  const [notifyKept, setNotifyKept] = useState(true);
  const [notifyThemes, setNotifyThemes] = useState(false);
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  const remaining = BIO_CAP - bio.length;

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (avatar?.startsWith("blob:")) URL.revokeObjectURL(avatar);
    setAvatar(URL.createObjectURL(file));
    setSaved(false);
  };

  const track =
    <Type,>(setter: (next: Type) => void) =>
    (next: Type) => {
      setter(next);
      setSaved(false);
    };

  return (
    <div className="bg-chalk relative flex h-full w-full flex-col overflow-hidden">
      <div className="grain-texture pointer-events-none absolute inset-0 z-40 opacity-[0.055] mix-blend-multiply" />
      <ScreenHeader
        section="settings"
        back={{ href: `/keeper/${CURRENT_KEEPER_SLUG}`, label: "your shelf" }}
      />

      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain px-[18px] pt-[14px] pb-[24px]">
        <SectionLabel>profile</SectionLabel>
        <div className="flex items-center gap-[16px]">
          <KeeperAvatar name={name} src={avatar} size={72} />
          <label className="cursor-pointer">
            <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
            <span className="border-ink font-kept-mono inline-block border px-[12px] py-[9px] text-[10.5px] tracking-[0.05em] lowercase">
              change photo
            </span>
          </label>
        </div>

        <div className="mt-[18px]">
          <FieldLabel>display name</FieldLabel>
          <input
            className={fieldClassName}
            value={name}
            onChange={(event) => track(setName)(event.target.value)}
            placeholder="your name"
          />
        </div>

        <div className="mt-[18px]">
          <FieldLabel>where you live</FieldLabel>
          <input
            className={fieldClassName}
            value={place}
            onChange={(event) => track(setPlace)(event.target.value)}
            placeholder="city"
          />
        </div>

        <div className="mt-[18px] flex items-baseline justify-between">
          <FieldLabel>about you</FieldLabel>
          <span
            className={cn(
              "font-kept-mono text-[11px] lining-nums tabular-nums",
              remaining < 20 ? "text-oxblood" : "text-ink-faint",
            )}
          >
            {remaining}
          </span>
        </div>
        <div className="mt-[6px]">
          <textarea
            className={cn(textareaClassName, "h-[92px]")}
            maxLength={BIO_CAP}
            value={bio}
            onChange={(event) => track(setBio)(event.target.value)}
            placeholder="What you keep, and why. A line or two for the people who visit your shelf."
          />
        </div>

        <div className="bg-ink mt-[24px] h-px" />

        <SectionLabel>who sees your shelf</SectionLabel>
        <Segmented
          options={[
            { value: "everyone", label: "everyone" },
            { value: "private", label: "only me" },
          ]}
          value={visibility}
          onChange={track(setVisibility)}
        />
        <div className="mt-[6px]">
          <Toggle
            label="Show where you live"
            hint="Your city appears beside your name on your profile."
            checked={showPlace}
            onChange={track(setShowPlace)}
          />
        </div>

        <div className="bg-ink mt-[18px] h-px" />

        <SectionLabel>notifications</SectionLabel>
        <div>
          <Toggle
            label="When someone keeps a thing you kept"
            hint="You share an object with a stranger — we tell you when it happens."
            checked={notifyKept}
            onChange={track(setNotifyKept)}
          />
          <Toggle
            label="Weekly themes"
            hint="A prompt each week for the kind of thing worth digging out."
            checked={notifyThemes}
            onChange={track(setNotifyThemes)}
          />
        </div>

        <div className="bg-ink mt-[18px] h-px" />

        <SectionLabel>account</SectionLabel>
        <div>
          <FieldLabel>email</FieldLabel>
          <div className="border-hair text-ink-3 flex items-center justify-between border-b pt-[7px] pb-[6px] text-[16px]">
            <span>{email}</span>
            <span className="text-ink-faint font-kept-mono text-[8.5px] tracking-[0.1em] uppercase">
              locked
            </span>
          </div>
        </div>
        <div className="mt-[18px]">
          <FieldLabel>username</FieldLabel>
          <input
            className={fieldClassName}
            value={username}
            onChange={(event) =>
              track(setUsername)(event.target.value.replace(/[^a-z0-9-]/gi, "").toLowerCase())
            }
            placeholder="username"
          />
        </div>
        <div className="mt-[18px]">
          <FieldLabel>language</FieldLabel>
          <div className="mt-[7px]">
            <Segmented
              options={[
                { value: "en", label: "english" },
                { value: "uk", label: "українська" },
                { value: "ru", label: "русский" },
              ]}
              value={language}
              onChange={track(setLanguage)}
            />
          </div>
        </div>

        <button
          onClick={() => setSaved(true)}
          className="border-ink bg-ink text-chalk hover:bg-oxblood hover:border-oxblood mt-[24px] flex h-[52px] w-full cursor-pointer items-center justify-center gap-[9px] border text-[15px] font-semibold"
        >
          {saved ? "Saved" : "Save changes"}
        </button>

        <Link
          href="/login"
          className="border-oxblood text-oxblood hover:bg-oxblood hover:text-chalk mt-[10px] flex h-[48px] w-full items-center justify-center border text-[14px] font-semibold no-underline"
        >
          Sign out
        </Link>

        <p className="text-ink-faint font-kept-mono mt-[14px] text-center text-[10px] leading-[1.6] tracking-[0.05em] lowercase">
          keeper since {keeper.since} · reliqa
        </p>
      </div>
    </div>
  );
};
