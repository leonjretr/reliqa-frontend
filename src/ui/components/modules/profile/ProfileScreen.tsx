import type { APIObjectListItem } from "@/service/types";
import { ScrollBody } from "@/ui/components/common/ScrollBody";
import type { KeeperProfile } from "@/ui/types";

import { EmptyShelf, ProfileHeader, ShelfGrid, ShelfStats } from "./sections";

type Props = {
  keeper: KeeperProfile;
  objects: APIObjectListItem[];
  isOwn: boolean;
};

export const ProfileScreen = ({ keeper, objects, isOwn }: Props) => {
  const hasKept = objects.length > 0;

  return (
    <div className="flex h-full flex-col">
      <ProfileHeader keeper={keeper} isOwn={isOwn} />
      <ScrollBody className="px-4.5 py-5">
        {keeper.bio && (
          <p className="text-ink-2 text-copy-lg mb-4.5 leading-normal font-light italic">
            {keeper.bio}
          </p>
        )}
        <ShelfStats keptCount={objects.length} since={keeper.since} />
        {hasKept ? (
          <ShelfGrid objects={objects} />
        ) : (
          <EmptyShelf keeperName={keeper.name} isOwn={isOwn} />
        )}
      </ScrollBody>
    </div>
  );
};
