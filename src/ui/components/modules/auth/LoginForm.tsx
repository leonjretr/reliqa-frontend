"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n";
import { loginWithPassword } from "@/service/actions";
import { Alert, AlertDescription } from "@/ui/components/lib/shadcn/alert";
import { Button } from "@/ui/components/lib/shadcn/button";
import { Input } from "@/ui/components/lib/shadcn/input";
import { Label } from "@/ui/components/lib/shadcn/label";
import { Spinner } from "@/ui/components/lib/shadcn/spinner";
import { PasswordField } from "@/ui/components/modules/auth/PasswordField";
import { LoginFormValues, loginSchema } from "@/ui/validation/auth";

export const LoginForm = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [formError, setFormError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(undefined);
    const result = await loginWithPassword(values);

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
        autoComplete="current-password"
        error={errors.password?.message}
        registration={register("password")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        {t("LABEL_LOGIN_SUBMIT")}
      </Button>
    </form>
  );
};
