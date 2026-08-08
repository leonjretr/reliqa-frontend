"use client";

import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/components/lib/shadcn/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/components/lib/shadcn/tabs";

import { SigninForm } from "./SigninForm";
import { SignupForm } from "./SignupForm";

export const AuthCard = () => {
  const t = useTranslations("Auth");

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{t("TITLE_AUTH")}</CardTitle>
        <CardDescription>{t("DESCRIPTION_AUTH")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin">
          <TabsList className="w-full">
            <TabsTrigger value="signin">{t("BUTTON_SIGNIN")}</TabsTrigger>
            <TabsTrigger value="signup">{t("BUTTON_SIGNUP")}</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SigninForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
