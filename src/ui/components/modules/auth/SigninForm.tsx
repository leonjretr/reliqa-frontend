"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { signIn } from "@/service/actions";
import { Button } from "@/ui/components/lib/shadcn/button";
import { FieldError, FieldGroup } from "@/ui/components/lib/shadcn/field";
import { Spinner } from "@/ui/components/lib/shadcn/spinner";
import { applyActionErrors } from "@/ui/utils";
import { cn } from "@/ui/utils/shadcn";
import { signInSchema, SignInValues } from "@/ui/validation";

import { AuthField } from "./AuthField";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { SHADOW_RAISED, SHADOW_RAISED_HOVER } from "./shadows";

export const SigninForm = () => {
  const router = useRouter();
  const t = useTranslations("Auth");

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <AuthField
          id="signin-email"
          label={t("LABEL_EMAIL")}
          type="email"
          autoComplete="email"
          placeholder="you@reliqa.space"
          error={formState.errors.email}
          {...register("email")}
        />
        <AuthField
          id="signin-password"
          label={t("LABEL_PASSWORD")}
          type="password"
          autoComplete="current-password"
          error={formState.errors.password}
          {...register("password")}
        />
        <FieldError errors={[formState.errors.root]} />
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className={cn(
            "h-11 w-full rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5",
            SHADOW_RAISED,
            SHADOW_RAISED_HOVER,
          )}
        >
          {formState.isSubmitting && <Spinner />}
          {t("BUTTON_SIGNIN")}
        </Button>
        <GoogleAuthButton />
      </FieldGroup>
    </form>
  );
};
