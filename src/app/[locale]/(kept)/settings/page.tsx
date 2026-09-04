import { redirect } from "@/i18n";
import { getCurrentUser } from "@/service";
import { SettingsScreen } from "@/ui/components/modules/profile";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const user = await getCurrentUser();

  if (!user.success) {
    redirect({ href: "/login", locale });
  }

  return <SettingsScreen user={user} />;
};

export default Page;
