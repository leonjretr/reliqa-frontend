import { Link } from "@/i18n";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { hasObjectPage, type Story } from "@/ui/components/modules/feed";

type StoryScreenProps = {
  story: Story;
};

export const StoryScreen = ({ story }: StoryScreenProps) => {
  const objectHasPage = hasObjectPage(story.objectSlug);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      <div className="kept-col" style={{ flex: 1, minHeight: 0 }}>
        <div style={{ position: "relative", height: 372 }}>
          <KeptPhoto
            category={story.category}
            src={story.photo}
            alt={`${story.model} kept by ${story.name}`}
            style={{ position: "absolute", inset: 0 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(20,14,9,.92) 0%, rgba(20,14,9,.35) 45%, rgba(20,14,9,.35) 100%)",
            }}
          />
          <Link
            href="/"
            style={{ position: "absolute", top: 15, left: 18, textDecoration: "none", zIndex: 2 }}
          >
            <span className="sc" style={{ color: "#f6f1e8" }}>
              ← the feed
            </span>
          </Link>
          <span
            className="sc fig"
            style={{
              position: "absolute",
              top: 15,
              right: 18,
              color: "rgba(246,241,232,.72)",
              zIndex: 2,
            }}
          >
            {story.year}
          </span>
          <div
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 18px 18px" }}
          >
            <div className="sc" style={{ color: "rgba(246,241,232,.72)" }}>
              {story.kind} · {story.place} · {story.relation}
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontWeight: 700,
                fontSize: 30,
                lineHeight: 1.02,
                letterSpacing: "-.025em",
                color: "#f6f1e8",
                marginTop: 6,
              }}
            >
              {story.name}
            </div>
            <p
              style={{
                margin: "10px 0 0",
                fontFamily: "var(--serif)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.4,
                color: "#f6f1e8",
              }}
            >
              “{story.text}”
            </p>
          </div>
        </div>

        <div style={{ padding: "18px 18px 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
            <span className="sc">{story.model}</span>
            <span className="rule" style={{ flex: 1, transform: "translateY(-3px)" }} />
            <span className="sc fig">held {story.held}</span>
          </div>

          {story.body.map((paragraph, index) => (
            <p
              key={index}
              style={{
                margin: index === 0 ? "16px 0 0" : "14px 0 0",
                fontFamily: "var(--serif)",
                fontWeight: 300,
                fontSize: 17,
                lineHeight: 1.62,
                color: "var(--ink-2)",
              }}
            >
              {paragraph}
            </p>
          ))}

          <div
            style={{
              marginTop: 22,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              background: "var(--ink)",
              border: "var(--key)",
            }}
          >
            <Link
              href={`/keeper/${story.keeperSlug}`}
              style={{
                background: "var(--chalk)",
                padding: "13px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 15 }}>
                {story.name}’s shelf
              </span>
              <span className="sc" style={{ color: "var(--oxblood)" }}>
                everything kept →
              </span>
            </Link>
            {objectHasPage && (
              <Link
                href={`/thing/${story.objectSlug}`}
                style={{
                  background: "var(--chalk)",
                  padding: "13px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 15 }}>
                  {story.model}
                </span>
                <span className="sc" style={{ color: "var(--oxblood)" }}>
                  everyone who kept one →
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
