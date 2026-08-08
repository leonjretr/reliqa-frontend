"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n";
import { signup } from "@/service/actions";
import { Alert, AlertDescription } from "@/ui/components/lib/shadcn/alert";
import { Button } from "@/ui/components/lib/shadcn/button";
import { Input } from "@/ui/components/lib/shadcn/input";
import { Label } from "@/ui/components/lib/shadcn/label";
import { Spinner } from "@/ui/components/lib/shadcn/spinner";
import { PasswordField } from "@/ui/components/modules/auth/PasswordField";
import { SignupFormValues, signupSchema } from "@/ui/validation/auth";

export const SignupForm = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [formError, setFormError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(undefined);
    const result = await signup(values);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    router.push("/");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {formError && (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">{t("LABEL_FIRST_NAME")}</Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            placeholder={t("PLACEHOLDER_FIRST_NAME")}
            {...register("firstName")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">{t("LABEL_LAST_NAME")}</Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            placeholder={t("PLACEHOLDER_LAST_NAME")}
            {...register("lastName")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">{t("LABEL_EMAIL")}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t("PLACEHOLDER_EMAIL")}
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
      </div>
      <PasswordField
        id="password"
        label={t("LABEL_PASSWORD")}
        autoComplete="new-password"
        placeholder={t("PLACEHOLDER_PASSWORD_SIGNUP")}
        error={errors.password?.message}
        registration={register("password")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        {t("LABEL_SIGNUP_SUBMIT")}
      </Button>
    </form>
  );
};
