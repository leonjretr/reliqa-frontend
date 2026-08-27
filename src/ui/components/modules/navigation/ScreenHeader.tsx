import { Link } from "@/i18n";

type ScreenHeaderProps = {
  section: string;
  right?: string;
  back?: { href: string; label: string };
};

export const ScreenHeader = ({ section, right, back }: ScreenHeaderProps) => {
  return (
    <div style={{ flex: "none", padding: "15px 18px 9px", background: "var(--chalk)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        {back ? (
          <Link href={back.href} style={{ textDecoration: "none" }}>
            <span className="sc" style={{ color: "var(--oxblood)" }}>
              ← {back.label}
            </span>
          </Link>
        ) : (
          <span
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: "-.005em",
            }}
          >
            Reliqa
          </span>
        )}
        <span className="sc">{section}</span>
        <span className="sc fig">{right ?? ""}</span>
      </div>
      <div className="rule-k" style={{ marginTop: 9 }} />
    </div>
  );
};
