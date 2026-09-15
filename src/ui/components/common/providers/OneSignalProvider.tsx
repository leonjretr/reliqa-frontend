"use client";

import { useEffect } from "react";

import { initOneSignal, loginOneSignal, logoutOneSignal } from "@/service/onesignal";

type Props = {
  appId?: string;
  userId?: string;
};

export const OneSignalProvider = ({ appId, userId }: Props) => {
  useEffect(() => {
    if (appId) initOneSignal(appId);
  }, [appId]);

  useEffect(() => {
    if (!appId || !userId) return;
    loginOneSignal(userId);

    return () => {
      logoutOneSignal();
    };
  }, [appId, userId]);

  return null;
};
