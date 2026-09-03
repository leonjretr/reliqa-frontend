type Props = {
  title: string;
  subtitle: string;
};

export const AuthHeading = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-auth-ink-900 font-newsreader text-[33px] leading-[1.04] tracking-[-0.02em]">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm leading-[1.45]">{subtitle}</p>
    </div>
  );
};
