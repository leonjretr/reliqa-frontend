import { LOCAL_PREVIEW_PROTOCOL } from "@/config";

export const isLocalPreview = (src: string) => src.startsWith(LOCAL_PREVIEW_PROTOCOL);
