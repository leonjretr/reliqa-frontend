type Props = {
  title: string;
  subtitle: string;
};

export const AuthHeading = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-auth-ink-900 font-newsreader text-display-sm leading-title tracking-snug">
        {title}
      </h1>
      <p className="text-muted-foreground leading-subtitle text-sm">{subtitle}</p>
    </div>
  );
};
