import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn } from "@/service/actions";
import { Button, Checkbox, FieldError, FieldGroup, Label } from "@/ui/components/lib/shadcn";
import { applyActionErrors } from "@/ui/utils";
import { signInSchema, type SignInValues } from "@/ui/validation";

import { useEnterApp } from "../hooks";
import { AuthHeading, GoogleAuthButton } from "../sections";
import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";

const REMEMBER_ID = "signin-remember";

export const SigninForm = () => {
  const t = useTranslations("Auth");
  const enterApp = useEnterApp();
  const [isRemembered, setIsRemembered] = useState(true);
  const { formState, setError, register, handleSubmit } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignInValues) => {
    const result = await signIn(values.email, values.password);

    if (!result.success) {
      applyActionErrors(result, setError, ["email", "password"], t("ERROR_SIGNIN"));
      return;
    }

    enterApp();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6.5">
      <AuthHeading title={t("TITLE_SIGNIN")} subtitle={t("SUBTITLE_SIGNIN")} />

      <FieldGroup className="gap-5.5">
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
            id={REMEMBER_ID}
            checked={isRemembered}
            onCheckedChange={setIsRemembered}
            className="border-auth-line-strong data-[checked]:border-auth-brass-600 rounded-paper size-4.5"
          />
          <Label
            htmlFor={REMEMBER_ID}
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

      <FieldError errors={[formState.errors.root]} className="text-note" />

      <div className="flex flex-col gap-3.5">
        <AuthSubmitButton
          isSubmitting={formState.isSubmitting}
          label={t("BUTTON_SIGNIN")}
          loadingLabel={t("BUTTON_SIGNIN_LOADING")}
        />
        <Button
          type="button"
          variant="outline"
          disabled
          className="border-auth-line-strong text-auth-ink-700 hover:bg-auth-ghost-hover rounded-button h-11 text-sm font-medium"
        >
          {t("BUTTON_MAGIC_LINK")}
        </Button>
        <GoogleAuthButton />
      </div>
    </form>
  );
};
