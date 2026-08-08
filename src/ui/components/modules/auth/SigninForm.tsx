"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { signIn } from "@/service/actions";
import { Button } from "@/ui/components/lib/shadcn/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/ui/components/lib/shadcn/field";
import { Input } from "@/ui/components/lib/shadcn/input";
import { Spinner } from "@/ui/components/lib/shadcn/spinner";
import { applyActionErrors } from "@/ui/utils";
import { signInSchema, SignInValues } from "@/ui/validation";

import { GoogleAuthButton } from "./GoogleAuthButton";

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

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="signin-email">{t("LABEL_EMAIL")}</FieldLabel>
          <Input
            id="signin-email"
            type="email"
            autoComplete="email"
            placeholder="you@reliqa.space"
            {...register("email")}
          />
          <FieldError errors={[formState.errors.email]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="signin-password">{t("LABEL_PASSWORD")}</FieldLabel>
          <Input
            id="signin-password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          <FieldError errors={[formState.errors.password]} />
        </Field>
        <FieldError errors={[formState.errors.root]} />
        <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
          {formState.isSubmitting && <Spinner />}
          {t("BUTTON_SIGNIN")}
        </Button>
        <FieldSeparator>{t("LABEL_OR")}</FieldSeparator>
        <GoogleAuthButton />
      </FieldGroup>
    </form>
  );
};
