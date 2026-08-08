"use client";

import { FieldError as FieldErrorType } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/ui/components/lib/shadcn/field";
import { Input } from "@/ui/components/lib/shadcn/input";

type Props = React.ComponentProps<typeof Input> & {
  id: string;
  label: string;
  error?: FieldErrorType;
};

export const AuthField = ({ id, label, error, ...props }: Props) => {
  return (
    <Field className="gap-2">
      <FieldLabel htmlFor={id} className="text-sm font-medium">
        {label}
      </FieldLabel>
      <Input
        id={id}
        className="bg-muted/60 focus-visible:bg-background dark:bg-muted/40 h-11 rounded-xl border-0 px-4 text-sm shadow-none transition-all focus-visible:ring-2 md:text-sm"
        {...props}
      />
      <FieldError errors={[error]} />
    </Field>
  );
};
