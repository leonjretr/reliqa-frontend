import { notFound } from "next/navigation";

import { getObject, getObjectStories } from "@/service/api";
import { ObjectDetail } from "@/ui/components/modules/catalog";

const Page = async ({ params }: PageProps<"/[locale]/thing/[slug]">) => {
  const { slug } = await params;
  const object = await getObject(slug);

  if (!object.success) {
    notFound();
  }

  const stories = await getObjectStories(object.id);

  return <ObjectDetail object={object} stories={stories.success ? stories.results : []} />;
};

export default Page;
