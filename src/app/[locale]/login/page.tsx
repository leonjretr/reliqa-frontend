import { redirectSignedIn } from "@/service/guards";
import { AuthCard } from "@/ui/components/modules/auth";

const Page = async ({ params }: PageProps<"/[locale]/login">) => {
  const { locale } = await params;
  await redirectSignedIn(locale);

  return <AuthCard />;
};

export default Page;
