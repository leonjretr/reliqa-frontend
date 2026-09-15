"use client";

import { useTabs } from "../hooks/useTabs";
import { TabItem } from "./TabItem";

type Props = {
  profileSlug: string | null;
};

export const TabBar = ({ profileSlug }: Props) => {
  const tabs = useTabs(profileSlug);

  return (
    <nav className="border-ink bg-chalk flex flex-none items-stretch border-t">
      {tabs.map((tab) => (
        <TabItem key={tab.href} tab={tab} />
      ))}
    </nav>
  );
};
