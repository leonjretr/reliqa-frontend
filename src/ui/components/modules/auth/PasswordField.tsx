"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { UseFormRegisterReturn } from "react-hook-form";

import { Button } from "@/ui/components/lib/shadcn/button";
import { Input } from "@/ui/components/lib/shadcn/input";
import { Label } from "@/ui/components/lib/shadcn/label";

type Props = {
  id: string;
  label: string;
  autoComplete: string;
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn;
};

export const PasswordField = ({
  id,
  label,
  autoComplete,
  placeholder,
  error,
  registration,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className="pr-8"
          {...registration}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="absolute top-1/2 right-1 -translate-y-1/2"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          <HugeiconsIcon icon={isVisible ? EyeOffIcon : EyeIcon} />
        </Button>
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
};
