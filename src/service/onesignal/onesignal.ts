import OneSignal from "react-onesignal";

import { ONESIGNAL_WORKER } from "@/config";

let hasStartedInit = false;

export const initOneSignal = async (appId: string) => {
  if (hasStartedInit) return;
  hasStartedInit = true;

  try {
    await OneSignal.init({
      appId,
      serviceWorkerPath: ONESIGNAL_WORKER.PATH,
      serviceWorkerParam: { scope: ONESIGNAL_WORKER.SCOPE },
    });
  } catch (error) {
    console.error("Failed to init onesignal:", error);
  }
};

export const loginOneSignal = async (externalId: string) => {
  try {
    await OneSignal.login(externalId);
  } catch (error) {
    console.error("Failed to login onesignal:", error);
  }
};

export const logoutOneSignal = async () => {
  try {
    await OneSignal.logout();
  } catch (error) {
    console.error("Failed to logout onesignal:", error);
  }
};
