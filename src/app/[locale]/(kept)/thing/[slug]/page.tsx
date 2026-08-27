import { notFound } from "next/navigation";

import { ObjectDetail } from "@/ui/components/modules/catalog";
import { getObject, OBJECTS } from "@/ui/components/modules/feed";

export const generateStaticParams = () => OBJECTS.map((object) => ({ slug: object.slug }));

const Page = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { slug } = await params;
  const object = getObject(slug);

  if (!object) {
    notFound();
  }

  return <ObjectDetail object={object} />;
};

export default Page;
