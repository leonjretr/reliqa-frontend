"use client";

import { useState } from "react";
import { FieldError as FieldErrorType } from "react-hook-form";

import { EyeIcon, EyeOffIcon } from "@/ui/components/common/icons";
import { Button } from "@/ui/components/lib/shadcn/button";
import { Field, FieldError } from "@/ui/components/lib/shadcn/field";
import { Input } from "@/ui/components/lib/shadcn/input";
import { Label } from "@/ui/components/lib/shadcn/label";
import { cn } from "@/ui/utils/shadcn";

type Props = React.ComponentProps<typeof Input> & {
  id: string;
  label: string;
  error?: FieldErrorType;
  revealable?: boolean;
  toggleLabel?: string;
};

const inputClassName =
  "border-input focus-visible:border-primary aria-invalid:border-destructive text-auth-ink-700 placeholder:text-auth-ink-300 h-10 rounded-none border-0 border-b bg-transparent px-0 py-0 text-base shadow-none transition-shadow focus-visible:shadow-auth-focus focus-visible:ring-0 aria-invalid:shadow-none aria-invalid:ring-0 md:text-base md:py-0";

export const AuthField = ({ id, label, error, revealable, toggleLabel, type, ...props }: Props) => {
  const [revealed, setRevealed] = useState(false);
  const resolvedType = revealable ? (revealed ? "text" : "password") : type;

  return (
    <Field className="gap-1.75">
      <Label
        htmlFor={id}
        className="text-muted-foreground font-plex-mono text-meta tracking-spaced uppercase"
      >
        {label}
      </Label>
      {revealable ? (
        <span className="relative flex">
          <Input
            id={id}
            type={resolvedType}
            aria-invalid={!!error}
            className={cn(inputClassName, "pr-10")}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={toggleLabel}
            onClick={() => setRevealed((current) => !current)}
            className="text-auth-ink-300 hover:bg-auth-ghost-hover hover:text-auth-ink-700 absolute top-0.75 right-0 size-8 rounded-full"
          >
            {revealed ? (
              <EyeOffIcon className="size-4.25" strokeWidth={1.75} />
            ) : (
              <EyeIcon className="size-4.25" strokeWidth={1.75} />
            )}
          </Button>
        </span>
      ) : (
        <Input id={id} type={type} aria-invalid={!!error} className={inputClassName} {...props} />
      )}
      <FieldError errors={[error]} className="text-note" />
    </Field>
  );
};
