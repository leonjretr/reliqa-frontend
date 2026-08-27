import { Link } from "@/i18n";
import { STOCK, type Keeper } from "@/ui/components/modules/feed";

type ProfileScreenProps = {
  keeper: Keeper;
};

export const ProfileScreen = ({ keeper }: ProfileScreenProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        className="torn"
        style={{ height: 172, background: "var(--plum)", position: "relative", flex: "none" }}
      >
        <div className="grain" />
        <div style={{ position: "absolute", left: 20, bottom: 26, color: "#f6e9ee" }}>
          <div className="sc" style={{ color: "rgba(246,233,238,.75)", marginBottom: 6 }}>
            keeper since {keeper.since} · {keeper.place}
          </div>
          <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 34 }}>
            {keeper.name}
          </div>
        </div>
      </div>
      <div className="kept-col" style={{ padding: "22px 18px 22px", flex: 1, minHeight: 0 }}>
        <div className="sc" style={{ marginBottom: 14 }}>
          {keeper.kept.length} things kept a memory on
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {keeper.kept.map((item, index) => {
            const stock = STOCK[item.stock % STOCK.length];
            return (
              <Link
                key={item.objectSlug}
                href={`/thing/${item.objectSlug}`}
                style={{
                  background: stock.bg,
                  color: stock.fg,
                  border: "var(--key)",
                  borderRadius: 3,
                  padding: "11px 12px 12px",
                  transform: `rotate(${index % 2 ? 2 : -2}deg)`,
                  boxShadow: "0 6px 14px -8px rgba(31,26,21,.4)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="sc"
                  style={{ color: "currentColor", opacity: 0.72, fontSize: 8, marginBottom: 5 }}
                >
                  {item.category} · {item.year}
                </div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 1.15,
                  }}
                >
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
