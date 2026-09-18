import { notFound } from "next/navigation";

import { getObject } from "@/service/api";
import { ObjectScreen } from "@/ui/components/modules/object";

const Page = async ({ params }: PageProps<"/[locale]/thing/[slug]">) => {
  const { slug } = await params;
  const object = await getObject(slug);

  if (!object.success) {
    notFound();
  }

  return <ObjectScreen object={object} />;
};

export default Page;
