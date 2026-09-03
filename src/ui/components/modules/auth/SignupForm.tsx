"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { signUp } from "@/service/actions";
import { Button } from "@/ui/components/lib/shadcn/button";
import { FieldError, FieldGroup } from "@/ui/components/lib/shadcn/field";
import { Spinner } from "@/ui/components/lib/shadcn/spinner";
import { applyActionErrors } from "@/ui/utils";
import { signUpSchema, SignUpValues } from "@/ui/validation";

import { AuthField } from "./AuthField";
import { AuthHeading } from "./AuthHeading";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { VisibilityToggle } from "./VisibilityToggle";

export const SignupForm = () => {
  const router = useRouter();
  const t = useTranslations("Auth");
  const [isPublic, setIsPublic] = useState(true);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onSubmit",
  });
  const { formState, setError, register, handleSubmit } = form;

  const onSubmit = async ({ email, password }: SignUpValues) => {
    const result = await signUp({ email, password });

    if (!result.success) {
      applyActionErrors(result, setError, ["email", "password"], t("ERROR_SIGNUP"));
      return;
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[26px]">
      <AuthHeading title={t("TITLE_SIGNUP")} subtitle={t("SUBTITLE_SIGNUP")} />

      <FieldGroup className="gap-[22px]">
        <AuthField
          id="signup-name"
          label={t("LABEL_NAME")}
          type="text"
          autoComplete="name"
          placeholder={t("PLACEHOLDER_NAME")}
          error={formState.errors.name}
          {...register("name")}
        />
        <AuthField
          id="signup-email"
          label={t("LABEL_EMAIL")}
          type="email"
          autoComplete="email"
          placeholder={t("PLACEHOLDER_EMAIL")}
          error={formState.errors.email}
          {...register("email")}
        />
        <AuthField
          id="signup-password"
          label={t("LABEL_PASSWORD")}
          revealable
          toggleLabel={t("PASSWORD_TOGGLE")}
          autoComplete="new-password"
          placeholder={t("PLACEHOLDER_PASSWORD_SIGNUP")}
          error={formState.errors.password}
          {...register("password")}
        />
      </FieldGroup>

      <VisibilityToggle isPublic={isPublic} onChange={setIsPublic} />

      <FieldError errors={[formState.errors.root]} className="text-[12px]" />

      <div className="flex flex-col gap-3.5">
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="hover:bg-auth-brass-600 h-[52px] rounded-[6px] text-base font-medium active:scale-[0.97]"
        >
          {formState.isSubmitting && <Spinner />}
          {formState.isSubmitting ? t("BUTTON_SIGNUP_LOADING") : t("BUTTON_SIGNUP")}
        </Button>
        <p className="text-muted-foreground text-center text-xs leading-[1.45]">
          {t.rich("TERMS", {
            terms: (chunks) => (
              <span className="text-auth-brass-700 underline underline-offset-2">{chunks}</span>
            ),
            privacy: (chunks) => (
              <span className="text-auth-brass-700 underline underline-offset-2">{chunks}</span>
            ),
          })}
        </p>
        <GoogleAuthButton />
      </div>
    </form>
  );
};
