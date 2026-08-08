"use client";

import { useState } from "react";
import { GoogleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { getGoogleOAuthRedirectUri } from "@/service/actions";
import { Button } from "@/ui/components/lib/shadcn/button";
import { Spinner } from "@/ui/components/lib/shadcn/spinner";

type Props = {
  label: string;
};

export const GoogleAuthButton = ({ label }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>();

  const handleClick = async () => {
    setIsPending(true);
    setError(undefined);

    const result = await getGoogleOAuthRedirectUri();

    if (!result.success) {
      setError(result.message);
      setIsPending(false);
      return;
    }

    window.location.href = result.redirectUri;
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={isPending}
        onClick={handleClick}
      >
        {isPending ? <Spinner /> : <HugeiconsIcon icon={GoogleIcon} />}
        {label}
      </Button>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
};
