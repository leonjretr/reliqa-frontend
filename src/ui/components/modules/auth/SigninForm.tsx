"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { signIn } from "@/service/actions";
import { Button } from "@/ui/components/lib/shadcn/button";
import { Checkbox } from "@/ui/components/lib/shadcn/checkbox";
import { FieldError, FieldGroup } from "@/ui/components/lib/shadcn/field";
import { Label } from "@/ui/components/lib/shadcn/label";
import { Spinner } from "@/ui/components/lib/shadcn/spinner";
import { applyActionErrors } from "@/ui/utils";
import { signInSchema, SignInValues } from "@/ui/validation";

import { AuthField } from "./AuthField";
import { AuthHeading } from "./AuthHeading";
import { GoogleAuthButton } from "./GoogleAuthButton";

export const SigninForm = () => {
  const router = useRouter();
  const t = useTranslations("Auth");
  const [remember, setRemember] = useState(true);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });
  const { formState, setError, register, handleSubmit } = form;

  const onSubmit = async (values: SignInValues) => {
    const result = await signIn(values.email, values.password);

    if (!result.success) {
      applyActionErrors(result, setError, ["email", "password"], t("ERROR_SIGNIN"));
      return;
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[26px]">
      <AuthHeading title={t("TITLE_SIGNIN")} subtitle={t("SUBTITLE_SIGNIN")} />

      <FieldGroup className="gap-[22px]">
        <AuthField
          id="signin-email"
          label={t("LABEL_EMAIL")}
          type="email"
          autoComplete="email"
          placeholder={t("PLACEHOLDER_EMAIL")}
          error={formState.errors.email}
          {...register("email")}
        />
        <AuthField
          id="signin-password"
          label={t("LABEL_PASSWORD")}
          revealable
          toggleLabel={t("PASSWORD_TOGGLE")}
          autoComplete="current-password"
          placeholder={t("PLACEHOLDER_PASSWORD_SIGNIN")}
          error={formState.errors.password}
          {...register("password")}
        />
      </FieldGroup>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="signin-remember"
            checked={remember}
            onCheckedChange={setRemember}
            className="border-auth-line-strong data-[checked]:border-auth-brass-600 size-[18px] rounded-[3px]"
          />
          <Label
            htmlFor="signin-remember"
            className="text-auth-ink-700 cursor-pointer text-sm font-normal whitespace-nowrap"
          >
            {t("LABEL_REMEMBER")}
          </Label>
        </div>
        <Button
          type="button"
          variant="link"
          disabled
          className="text-auth-brass-700 hover:text-auth-brass-600 h-auto p-0 text-sm font-normal"
        >
          {t("LINK_FORGOT")}
        </Button>
      </div>

      <FieldError errors={[formState.errors.root]} className="text-[12px]" />

      <div className="flex flex-col gap-3.5">
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="hover:bg-auth-brass-600 h-[52px] rounded-[6px] text-base font-medium active:scale-[0.97]"
        >
          {formState.isSubmitting && <Spinner />}
          {formState.isSubmitting ? t("BUTTON_SIGNIN_LOADING") : t("BUTTON_SIGNIN")}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled
          className="border-auth-line-strong text-auth-ink-700 hover:bg-auth-ghost-hover h-11 rounded-[6px] text-sm font-medium"
        >
          {t("BUTTON_MAGIC_LINK")}
        </Button>
        <GoogleAuthButton />
      </div>
    </form>
  );
};
