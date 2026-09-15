import { useState, type ComponentProps } from "react";
import type { FieldError as FieldErrorType } from "react-hook-form";

import { EyeIcon, EyeOffIcon } from "@/ui/components/common/icons";
import { Button, Field, FieldError, Input, Label } from "@/ui/components/lib/shadcn";
import { cn } from "@/ui/utils";

const EYE_STROKE_WIDTH = 1.75;

const INPUT_CLASS_NAME =
  "border-input focus-visible:border-primary aria-invalid:border-destructive text-auth-ink-700 placeholder:text-auth-ink-300 h-10 rounded-none border-0 border-b bg-transparent px-0 py-0 text-base shadow-none transition-shadow focus-visible:shadow-auth-focus focus-visible:ring-0 aria-invalid:shadow-none aria-invalid:ring-0 md:text-base md:py-0";

type Props = ComponentProps<typeof Input> & {
  id: string;
  label: string;
  error?: FieldErrorType;
  revealable?: boolean;
  toggleLabel?: string;
};

export const AuthField = ({ id, label, error, revealable, toggleLabel, type, ...props }: Props) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const EyeToggleIcon = isRevealed ? EyeOffIcon : EyeIcon;
  const isInvalid = Boolean(error);

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
            type={isRevealed ? "text" : "password"}
            aria-invalid={isInvalid}
            className={cn(INPUT_CLASS_NAME, "pr-10")}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={toggleLabel}
            onClick={() => setIsRevealed((current) => !current)}
            className="text-auth-ink-300 hover:bg-auth-ghost-hover hover:text-auth-ink-700 absolute top-0.75 right-0 size-8 rounded-full"
          >
            <EyeToggleIcon className="size-4.25" strokeWidth={EYE_STROKE_WIDTH} />
          </Button>
        </span>
      ) : (
        <Input
          id={id}
          type={type}
          aria-invalid={isInvalid}
          className={INPUT_CLASS_NAME}
          {...props}
        />
      )}
      <FieldError errors={[error]} className="text-note" />
    </Field>
  );
};
