import { redirect } from "@/i18n";
import { getSession } from "@/service/session";
import { CaptureForm } from "@/ui/components/modules/capture";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const session = await getSession();

  if (!session) {
    redirect({ href: "/login", locale });
  }

  return <CaptureForm />;
};

export default Page;
