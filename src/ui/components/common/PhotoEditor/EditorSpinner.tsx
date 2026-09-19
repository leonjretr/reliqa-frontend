import { Spinner } from "@/ui/components/lib/shadcn";

export const EditorSpinner = () => (
  <div className="bg-night flex h-full items-center justify-center">
    <Spinner className="text-chalk/60 size-6" />
  </div>
);
