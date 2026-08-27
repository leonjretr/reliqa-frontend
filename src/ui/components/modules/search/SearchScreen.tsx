import { Link } from "@/i18n";
import { CATEGORIES, STOCK } from "@/ui/components/modules/feed";

export const SearchScreen = () => {
  return (
    <div className="cork" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "18px 18px 4px" }}>
        <div className="sc" style={{ color: "rgba(246,241,232,.75)", marginBottom: 8 }}>
          find something kept
        </div>
        <div
          style={{
            background: "var(--chalk)",
            border: "var(--key)",
            borderRadius: 3,
            padding: "11px 13px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 6px 14px -8px rgba(31,26,21,.4)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ink-faint)"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 15,
              color: "var(--ink-soft)",
            }}
          >
            a camera, a radio, a chair…
          </span>
        </div>
      </div>
      <div
        className="kept-col"
        style={{
          flex: 1,
          minHeight: 0,
          padding: "20px 16px 22px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "26px 14px",
          alignContent: "start",
        }}
      >
        {CATEGORIES.map((category, index) => {
          const stock = STOCK[category.stock % STOCK.length];
          return (
            <Link
              key={category.slug}
              href="/browse"
              style={{
                position: "relative",
                background: stock.bg,
                color: stock.fg,
                border: "var(--key)",
                borderRadius: 2,
                padding: "30px 12px 13px",
                transform: `rotate(${(index % 3) - 1}deg)`,
                boxShadow: "0 10px 18px -8px rgba(0,0,0,.4)",
                textDecoration: "none",
              }}
            >
              <div
                className="fiber"
                style={{ position: "absolute", inset: 0, opacity: 0.3, mixBlendMode: "overlay" }}
              />
              <div
                className="pin"
                style={{ position: "absolute", left: "50%", top: -5, marginLeft: -5.5 }}
              />
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontWeight: 700,
                  fontSize: 18,
                  textTransform: "capitalize",
                  marginBottom: 5,
                }}
              >
                {category.name}
              </div>
              <div className="sc" style={{ color: "currentColor", opacity: 0.8, fontSize: 8 }}>
                {category.count}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
