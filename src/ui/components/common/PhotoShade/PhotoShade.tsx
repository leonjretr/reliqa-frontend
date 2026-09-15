const SHADES = {
  feed: "photo-shade-feed",
  story: "photo-shade-story",
  preview: "photo-shade-preview",
};

type Props = {
  variant: keyof typeof SHADES;
};

export const PhotoShade = ({ variant }: Props) => (
  <div className={`${SHADES[variant]} absolute inset-0`} />
);
