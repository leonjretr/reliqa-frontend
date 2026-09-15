"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";

import { BIO_MAX_LENGTH, CHARACTERS_LOW_THRESHOLD, keeperPath, LOCALE_NAMES } from "@/config";
import { routing } from "@/i18n";
import { saveSettings, signOut } from "@/service/actions";
import type { ActionResult, APICurrentUser, APILanguage } from "@/service/types";
import { KeeperAvatar } from "@/ui/components/common/KeeperAvatar";
import { ScreenHeader } from "@/ui/components/modules/navigation";
import { cn } from "@/ui/utils/shadcn";

type SettingsScreenProps = {
  user: APICurrentUser;
};

const LANGUAGE_OPTIONS = routing.locales.map((locale) => ({
  value: locale,
  label: LOCALE_NAMES[locale],
}));

const saveProfile = async (profile: FormData): Promise<ActionResult> => {
  const response = await fetch("/api/users/me", {
    method: "PATCH",
    body: profile,
  });

  return (await response.json()) as ActionResult;
};

const fieldClassName =
  "text-ink placeholder:text-ink-faint border-ink w-full border-0 border-b bg-transparent pt-1.75 pb-1.5 text-field outline-none placeholder:font-light placeholder:italic";

const textareaClassName =
  "text-ink placeholder:text-ink-faint bg-stock border-ink w-full resize-none border px-3 py-2.75 text-reading leading-normal font-light outline-none placeholder:italic focus:bg-white";

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="text-ink-faint font-kept-mono text-eyebrow mt-6 mb-2.5 tracking-widest uppercase">
    {children}
  </div>
);

const FieldLabel = ({ children }: { children: ReactNode }) => (
  <div className="text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase">
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
    className="border-hair flex w-full items-center justify-between gap-3 border-b py-3.25 text-left last:border-b-0"
  >
    <span className="min-w-0">
      <span className="text-copy block font-medium">{label}</span>
      {hint && <span className="text-ink-3 text-hint leading-quote mt-0.5 block">{hint}</span>}
    </span>
    <span
      className={cn(
        "relative h-5.5 w-9.5 flex-none rounded-full border transition-colors",
        checked ? "bg-oxblood border-oxblood" : "bg-stock-2 border-ink",
      )}
    >
      <span
        className={cn(
          "bg-chalk absolute top-0.5 h-4 w-4 rounded-full transition-[left]",
          checked ? "left-4.5" : "left-0.5",
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
  <div className="border-ink rounded-paper flex overflow-hidden border">
    {options.map((option, index) => (
      <button
        key={option.value}
        onClick={() => onChange(option.value)}
        className={cn(
          "font-kept-mono text-caption flex-1 px-1.5 py-2.5 tracking-wider lowercase",
          index > 0 && "border-ink border-l",
          value === option.value ? "bg-ink text-chalk" : "text-ink-2 bg-transparent",
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);

const joinedYear = (isoDate: string) => String(new Date(isoDate).getFullYear());

export const SettingsScreen = ({ user }: SettingsScreenProps) => {
  const fullName = `${user.first_name} ${user.last_name}`.trim();
  const [name, setName] = useState(fullName || user.username);
  const [place, setPlace] = useState(user.residence);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState<string | undefined>(user.avatar?.src);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [username, setUsername] = useState(user.username);
  const [visibility, setVisibility] = useState(user.settings.is_private ? "private" : "everyone");
  const [showPlace, setShowPlace] = useState(user.settings.is_residence_visible);
  const [notifyKept, setNotifyKept] = useState(user.settings.is_push_enabled);
  const [notifyThemes, setNotifyThemes] = useState(false);
  const [language, setLanguage] = useState<string>(user.settings.language);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const remaining = BIO_MAX_LENGTH - bio.length;

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (avatar?.startsWith("blob:")) URL.revokeObjectURL(avatar);
    setAvatar(URL.createObjectURL(file));
    setAvatarFile(file);
    setSaved(false);
  };

  const track =
    <Type,>(setter: (next: Type) => void) =>
    (next: Type) => {
      setter(next);
      setSaved(false);
    };

  const handleSave = async () => {
    setIsSaving(true);

    const [firstName, ...rest] = name.trim().split(/\s+/);
    const profile = new FormData();
    profile.set("first_name", firstName ?? "");
    profile.set("last_name", rest.join(" "));
    profile.set("username", username);
    profile.set("residence", place.trim());
    profile.set("bio", bio.trim());
    if (avatarFile) {
      profile.set("avatar", avatarFile);
    }

    const [profileResult, settingsResult] = await Promise.all([
      saveProfile(profile),
      saveSettings({
        language: language as APILanguage,
        is_private: visibility === "private",
        is_residence_visible: showPlace,
        is_push_enabled: notifyKept,
      }),
    ]);

    setIsSaving(false);

    if (profileResult.success && settingsResult.success) {
      setAvatarFile(null);
      setSaved(true);
    }
  };

  return (
    <div className="bg-chalk relative flex h-full w-full flex-col overflow-hidden">
      <ScreenHeader
        section="settings"
        back={{ href: keeperPath(user.username), label: "your shelf" }}
      />

      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain px-4.5 pt-3.5 pb-6">
        <SectionLabel>profile</SectionLabel>
        <div className="flex items-center gap-4">
          <KeeperAvatar name={name} src={avatar} size={72} />
          <label className="cursor-pointer">
            <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
            <span className="border-ink font-kept-mono text-caption inline-block border px-3 py-2.25 tracking-wider lowercase">
              change photo
            </span>
          </label>
        </div>

        <div className="mt-4.5">
          <FieldLabel>display name</FieldLabel>
          <input
            className={fieldClassName}
            value={name}
            onChange={(event) => track(setName)(event.target.value)}
            placeholder="your name"
          />
        </div>

        <div className="mt-4.5">
          <FieldLabel>where you live</FieldLabel>
          <input
            className={fieldClassName}
            value={place}
            onChange={(event) => track(setPlace)(event.target.value)}
            placeholder="city"
          />
        </div>

        <div className="mt-4.5 flex items-baseline justify-between">
          <FieldLabel>about you</FieldLabel>
          <span
            className={cn(
              "font-kept-mono text-meta lining-nums tabular-nums",
              remaining < CHARACTERS_LOW_THRESHOLD ? "text-oxblood" : "text-ink-faint",
            )}
          >
            {remaining}
          </span>
        </div>
        <div className="mt-1.5">
          <textarea
            className={cn(textareaClassName, "h-23")}
            maxLength={BIO_MAX_LENGTH}
            value={bio}
            onChange={(event) => track(setBio)(event.target.value)}
            placeholder="What you keep, and why. A line or two for the people who visit your shelf."
          />
        </div>

        <div className="bg-ink mt-6 h-px" />

        <SectionLabel>who sees your shelf</SectionLabel>
        <Segmented
          options={[
            { value: "everyone", label: "everyone" },
            { value: "private", label: "only me" },
          ]}
          value={visibility}
          onChange={track(setVisibility)}
        />
        <div className="mt-1.5">
          <Toggle
            label="Show where you live"
            hint="Your city appears beside your name on your profile."
            checked={showPlace}
            onChange={track(setShowPlace)}
          />
        </div>

        <div className="bg-ink mt-4.5 h-px" />

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

        <div className="bg-ink mt-4.5 h-px" />

        <SectionLabel>account</SectionLabel>
        <div>
          <FieldLabel>email</FieldLabel>
          <div className="border-hair text-ink-3 text-copy-lg flex items-center justify-between border-b pt-1.75 pb-1.5">
            <span>{user.email}</span>
            <span className="text-ink-faint font-kept-mono text-stamp tracking-widest uppercase">
              locked
            </span>
          </div>
        </div>
        <div className="mt-4.5">
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
        <div className="mt-4.5">
          <FieldLabel>language</FieldLabel>
          <div className="mt-1.75">
            <Segmented options={LANGUAGE_OPTIONS} value={language} onChange={track(setLanguage)} />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="border-ink bg-ink text-chalk hover:bg-oxblood hover:border-oxblood text-copy mt-6 flex h-13 w-full cursor-pointer items-center justify-center gap-2.25 border font-semibold disabled:opacity-60"
        >
          {isSaving ? "Saving…" : saved ? "Saved" : "Save changes"}
        </button>

        <form action={signOut}>
          <button
            type="submit"
            className="border-oxblood text-oxblood hover:bg-oxblood hover:text-chalk text-control mt-2.5 flex h-12 w-full cursor-pointer items-center justify-center border font-semibold"
          >
            Sign out
          </button>
        </form>

        <p className="text-ink-faint font-kept-mono text-fine leading-note mt-3.5 text-center tracking-wider lowercase">
          keeper since {joinedYear(user.created_at)} · reliqa
        </p>
      </div>
      <div className="grain-texture pointer-events-none absolute inset-0 opacity-5.5 mix-blend-multiply" />
    </div>
  );
};
