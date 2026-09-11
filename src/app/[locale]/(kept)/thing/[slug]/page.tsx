import { notFound } from "next/navigation";

import { getObject, getObjectStories } from "@/service";
import { ObjectDetail } from "@/ui/components/modules/catalog";

const Page = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { slug } = await params;
  const object = await getObject(slug);

  if (!object.success) {
    notFound();
  }

  const stories = await getObjectStories(object.id);

  return <ObjectDetail object={object} stories={stories.success ? stories.results : []} />;
};

export default Page;
