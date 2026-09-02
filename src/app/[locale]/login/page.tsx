import { redirect } from "@/i18n";
import { getSession } from "@/service/session";
import { AuthCard } from "@/ui/components/modules/auth";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const session = await getSession();

  if (session) {
    redirect({ href: "/", locale });
  }

  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-20">
      <AuthCard />
    </main>
  );
};

export default Page;
