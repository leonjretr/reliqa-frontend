import { Link } from "@/i18n";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { groupThousands, OBJECTS, STOCK } from "@/ui/components/modules/feed";
import { ScreenHeader } from "@/ui/components/modules/navigation";

const DECADES = [
  { label: "50s", count: 8 },
  { label: "60s", count: 17 },
  { label: "70s", count: 24 },
  { label: "80s", count: 31 },
  { label: "90s", count: 22 },
  { label: "00s", count: 26 },
  { label: "10s", count: 14 },
];

const totalKept = OBJECTS.reduce((sum, item) => sum + item.keepers, 0);

const DecadesBand = () => {
  const max = Math.max(...DECADES.map((decade) => decade.count));
  return (
    <div style={{ display: "flex", gap: 1, border: "var(--key)", background: "var(--ink)" }}>
      {DECADES.map((decade) => {
        const isPeak = decade.count === max;
        const bars = Math.round((decade.count / max) * 7) || 1;
        return (
          <div
            key={decade.label}
            style={{
              flex: 1,
              background: "var(--chalk)",
              padding: "7px 0 6px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                gap: 1.5,
                height: 30,
                justifyContent: "flex-start",
              }}
            >
              {Array.from({ length: bars }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: 16,
                    height: 2.5,
                    background: isPeak ? "var(--oxblood)" : "var(--ink-2)",
                  }}
                />
              ))}
            </div>
            <span
              className="sc"
              style={{ fontSize: 8, color: isPeak ? "var(--oxblood)" : "var(--ink-faint)" }}
            >
              {decade.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const BrowseScreen = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      <div className="grain" />
      <ScreenHeader section="the catalogue" right={`${OBJECTS.length} things`} />
      <div className="kept-col" style={{ flex: 1, minHeight: 0 }}>
        <div style={{ padding: "16px 18px 6px" }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--serif)",
              fontWeight: 700,
              fontSize: 29,
              lineHeight: 1.05,
              letterSpacing: "-.028em",
            }}
          >
            Things people kept
          </h1>
          <div className="sc" style={{ marginTop: 7 }}>
            {groupThousands(totalKept)} memories stuck on so far
          </div>
        </div>
        <div
          style={{
            padding: "12px 18px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {OBJECTS.map((object, objectIndex) => {
            const layers = Math.min(4, Math.round(object.keepers / 24) + 1);
            return (
              <Link
                key={object.slug}
                href={`/thing/${object.slug}`}
                style={{
                  position: "relative",
                  paddingBottom: 26,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {Array.from({ length: layers }).map((_, layer) => (
                  <div
                    key={layer}
                    style={{
                      position: "absolute",
                      left: 7 + layer * 5,
                      right: 7 + layer * 5,
                      bottom: 26 - (layer + 1) * 6,
                      height: 12,
                      background: STOCK[(objectIndex + layer) % STOCK.length].bg,
                      border: "var(--key)",
                      borderRadius: 3,
                      zIndex: 0,
                    }}
                  />
                ))}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    background: "var(--chalk)",
                    border: "var(--key)",
                    borderRadius: 3,
                    display: "flex",
                    gap: 13,
                    padding: 11,
                    alignItems: "center",
                  }}
                >
                  <KeptPhoto
                    category={object.category}
                    style={{ width: 76, height: 76, flex: "none", border: "var(--key)" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div className="sc" style={{ fontSize: 8, marginBottom: 4 }}>
                      {object.category} · {object.year}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--serif)",
                        fontWeight: 700,
                        fontSize: 24,
                        lineHeight: 1,
                        letterSpacing: "-.02em",
                      }}
                    >
                      {object.name}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontFamily: "var(--serif)",
                        fontWeight: 600,
                        fontSize: 13,
                        color: "var(--oxblood)",
                      }}
                    >
                      {object.keepers} kept one
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          <div>
            <div className="sc" style={{ marginBottom: 8 }}>
              when the memories happened
            </div>
            <DecadesBand />
          </div>
        </div>
      </div>
    </div>
  );
};
