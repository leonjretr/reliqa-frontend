import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUp } from "@/service/actions";
import { FieldError, FieldGroup } from "@/ui/components/lib/shadcn";
import { applyActionErrors } from "@/ui/utils";
import { signUpSchema, type SignUpValues } from "@/ui/validation";

import { useEnterApp } from "../hooks";
import { AuthHeading, GoogleAuthButton } from "../sections";
import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";

const TermsLink = (chunks: ReactNode) => (
  <span className="text-auth-brass-700 underline underline-offset-2">{chunks}</span>
);

export const SignupForm = () => {
  const t = useTranslations("Auth");
  const enterApp = useEnterApp();
  const { formState, setError, register, handleSubmit } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async ({ email, password }: SignUpValues) => {
    const result = await signUp({ email, password });

    if (!result.success) {
      applyActionErrors(result, setError, ["email", "password"], t("ERROR_SIGNUP"));
      return;
    }

    enterApp();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6.5">
      <AuthHeading title={t("TITLE_SIGNUP")} subtitle={t("SUBTITLE_SIGNUP")} />

      <FieldGroup className="gap-5.5">
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

      <FieldError errors={[formState.errors.root]} className="text-note" />

      <div className="flex flex-col gap-3.5">
        <AuthSubmitButton
          isSubmitting={formState.isSubmitting}
          label={t("BUTTON_SIGNUP")}
          loadingLabel={t("BUTTON_SIGNUP_LOADING")}
        />
        <p className="text-muted-foreground leading-subtitle text-center text-xs">
          {t.rich("TERMS", { terms: TermsLink, privacy: TermsLink })}
        </p>
        <GoogleAuthButton />
      </div>
    </form>
  );
};
