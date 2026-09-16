import { loadSpecimens } from "@/service/actions";
import { redirectSignedIn } from "@/service/guards";
import { AuthCard } from "@/ui/components/modules/auth";

const Page = async ({ params }: PageProps<"/[locale]/login">) => {
  const { locale } = await params;
  await redirectSignedIn(locale);

  const specimens = await loadSpecimens();

  return <AuthCard specimens={specimens} />;
};

export default Page;
