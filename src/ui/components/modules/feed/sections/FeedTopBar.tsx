import { APP_NAME } from "@/config";

export const FeedTopBar = () => (
  <div className="feed-top-fade pointer-events-none absolute top-0 right-0 left-0 px-4.5 pt-3.5 pb-5.5">
    <span className="text-chalk text-copy font-bold">{APP_NAME}</span>
  </div>
);
