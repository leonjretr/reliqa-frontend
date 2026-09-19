import { useEffect, useState } from "react";

type LoadedImage = {
  src: string;
  ratio: number;
};

type ImageSource = {
  file: File;
  image: LoadedImage | null;
};

export const useImageSource = (file: File) => {
  const [source, setSource] = useState<ImageSource | null>(null);

  useEffect(() => {
    let isActive = true;
    let src: string | null = null;

    createImageBitmap(file).then(
      (bitmap) => {
        const ratio = bitmap.width / bitmap.height;
        bitmap.close();
        if (!isActive) return;
        src = URL.createObjectURL(file);
        setSource({ file, image: { src, ratio } });
      },
      () => {
        if (isActive) setSource({ file, image: null });
      },
    );

    return () => {
      isActive = false;
      if (src) URL.revokeObjectURL(src);
    };
  }, [file]);

  const current = source?.file === file ? source : null;

  return { image: current?.image ?? null, isError: current !== null && !current.image };
};
