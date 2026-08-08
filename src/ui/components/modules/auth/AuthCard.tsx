"use client";

import { useTranslations } from "next-intl";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/components/lib/shadcn/tabs";
import { cn } from "@/ui/utils/shadcn";

import { SHADOW_PILL, SHADOW_SURFACE } from "./shadows";
import { SigninForm } from "./SigninForm";
import { SignupForm } from "./SignupForm";

const triggerClassName = cn(
  "text-muted-foreground data-active:text-foreground h-9 flex-1 rounded-full border-0 bg-transparent text-sm font-medium transition-all data-active:bg-background dark:data-active:bg-background",
  SHADOW_PILL,
);

export const AuthCard = () => {
  const t = useTranslations("Auth");

  return (
    <div className={cn("bg-card w-full max-w-md rounded-3xl p-8 sm:p-10", SHADOW_SURFACE)}>
      <h1 className="text-2xl font-semibold tracking-tight text-balance">{t("TITLE_AUTH")}</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-balance">
        {t("DESCRIPTION_AUTH")}
      </p>

      <Tabs defaultValue="signin" className="mt-8 gap-8">
        <TabsList className="bg-muted/70 h-auto w-full rounded-full p-1 group-data-[orientation=horizontal]/tabs:h-auto">
          <TabsTrigger value="signin" className={triggerClassName}>
            {t("BUTTON_SIGNIN")}
          </TabsTrigger>
          <TabsTrigger value="signup" className={triggerClassName}>
            {t("BUTTON_SIGNUP")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SigninForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
