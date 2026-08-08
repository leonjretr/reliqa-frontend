import { setRequestLocale } from "next-intl/server";

const Home = async ({ params }: PageProps<"/[locale]">) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return null;
};

export default Home;
