"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import type { APIObjectListItem } from "@/service/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/components/lib/shadcn";
import { cn } from "@/ui/utils";

import { SigninForm, SignupForm } from "./forms";
import { SpecimenIndex } from "./sections";

const MODES = { SIGNIN: "signin", SIGNUP: "signup" } as const;

type Mode = (typeof MODES)[keyof typeof MODES];

const TRIGGER_CLASS_NAME = cn(
  "text-auth-ink-300 h-auto flex-none rounded-none border-0 border-b-2 font-plex-mono border-transparent px-0 pb-2.5 text-xs tracking-spaced uppercase transition-colors",
  "data-active:border-auth-brass-500 data-active:text-auth-ink-900 data-active:bg-transparent",
);

type Props = {
  specimens: APIObjectListItem[];
};

export const AuthCard = ({ specimens }: Props) => {
  const t = useTranslations("Auth");
  const [mode, setMode] = useState<Mode>(MODES.SIGNIN);

  return (
    <div className="bg-auth-ink-900 flex min-h-svh">
      <SpecimenIndex specimens={specimens} />

      <div className="bg-auth-paper-50 shadow-auth-sheet flex min-w-0 flex-1 flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="max-w-auth mx-auto flex w-full flex-col gap-5.5">
          <div className="border-auth-line-hairline flex items-center justify-between gap-4 border-b pb-4.5">
            <span className="text-muted-foreground font-plex-mono text-meta tracking-spaced uppercase">
              {t("READERS_CARD")}
            </span>
            <span className="text-auth-ink-300 font-plex-mono text-meta tracking-spaced uppercase">
              {t("RECORDS_COUNT")}
            </span>
          </div>

          <Tabs value={mode} onValueChange={(value) => setMode(value as Mode)}>
            <TabsList
              variant="line"
              className="h-auto w-fit justify-start gap-7 bg-transparent p-0"
            >
              <TabsTrigger value={MODES.SIGNIN} className={TRIGGER_CLASS_NAME}>
                {t("BUTTON_SIGNIN")}
              </TabsTrigger>
              <TabsTrigger value={MODES.SIGNUP} className={TRIGGER_CLASS_NAME}>
                {t("TAB_SIGNUP")}
              </TabsTrigger>
            </TabsList>
            <div className="auth-tab-stack grid">
              <TabsContent value={MODES.SIGNIN} keepMounted className="col-start-1 row-start-1">
                <SigninForm />
              </TabsContent>
              <TabsContent value={MODES.SIGNUP} keepMounted className="col-start-1 row-start-1">
                <SignupForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
