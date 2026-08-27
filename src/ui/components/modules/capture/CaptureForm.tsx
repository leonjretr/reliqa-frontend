"use client";

import { useState, type ChangeEvent } from "react";

import { KeptPhoto } from "@/ui/components/common/KeptPhoto";

const CAP = 140;
const ARRIVALS = ["inherited", "bought", "a gift", "found at home", "made it"];
const CATEGORY = "cameras";

export const CaptureForm = () => {
  const [arrival, setArrival] = useState("inherited");
  const [previous, setPrevious] = useState("my grandmother");
  const [place, setPlace] = useState("Tartu");
  const [year, setYear] = useState("1974");
  const [memory, setMemory] = useState(
    "It lived above the radio and nobody was allowed to touch it.",
  );
  const [longread, setLongread] = useState("");
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  const remaining = CAP - memory.length;
  const held = year ? 2026 - Number(year) : "—";
  const longWords = longread.trim() ? longread.trim().split(/\s+/).length : 0;

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "var(--chalk)",
      }}
    >
      <div className="grain" />
      <div style={{ flex: "none", padding: "15px 18px 9px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Reliqa</span>
          <span className="sc">add yours</span>
          <span className="sc fig">1 of 1</span>
        </div>
        <div className="rule-k" style={{ marginTop: 9 }} />
      </div>
      <div className="kept-col" style={{ flex: 1, minHeight: 0, padding: "14px 18px 24px" }}>
        <div className="sc">the thing</div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: "var(--key)",
            paddingBottom: 7,
            marginTop: 5,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 26, letterSpacing: "-.025em" }}>
            35 mm camera
          </span>
          <span className="sc" style={{ color: "var(--oxblood)" }}>
            change
          </span>
        </div>

        <div className="sc" style={{ marginTop: 20 }}>
          a photo of your object
        </div>
        <label style={{ display: "block", marginTop: 8, cursor: "pointer" }}>
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
          {photo ? (
            <div style={{ position: "relative", height: 214, border: "var(--key)" }}>
              <KeptPhoto
                category={CATEGORY}
                src={photo}
                alt="your object"
                style={{ position: "absolute", inset: 0 }}
              />
              <span
                className="sc"
                style={{
                  position: "absolute",
                  right: 8,
                  bottom: 8,
                  padding: "5px 8px",
                  background: "rgba(20,14,9,.6)",
                  color: "#f6f1e8",
                }}
              >
                replace
              </span>
            </div>
          ) : (
            <div
              style={{
                height: 214,
                background: "var(--stock-2)",
                border: "var(--key)",
                borderStyle: "dashed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ink-faint)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              <span className="sc" style={{ color: "var(--ink-faint)" }}>
                add a photograph
              </span>
            </div>
          )}
        </label>
        <p
          style={{
            margin: "8px 0 0",
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            lineHeight: 1.6,
            color: "var(--ink-3)",
          }}
        >
          One clear photo of the actual object — the one your story is about. Yours, not a stock
          picture. This is what people see first.
        </p>

        <div className="sc" style={{ marginTop: 22 }}>
          how it reached you
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 7 }}>
          {ARRIVALS.map((option) => (
            <button
              key={option}
              className="chip"
              data-on={arrival === option ? "1" : "0"}
              onClick={() => setArrival(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="sc" style={{ marginTop: 20 }}>
          whose was it before you{" "}
          <span style={{ textTransform: "none", letterSpacing: 0 }}>— optional</span>
        </div>
        <input
          className="fld"
          value={previous}
          onChange={(event) => setPrevious(event.target.value)}
          placeholder="a name, or a relation"
        />

        <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div className="sc">where</div>
            <input
              className="fld"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              placeholder="city"
            />
          </div>
          <div style={{ width: 96 }}>
            <div className="sc">since</div>
            <input
              className="fld fig"
              style={{ fontFamily: "var(--mono)", fontSize: 16 }}
              value={year}
              onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="year"
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <div className="sc">the one line</div>
          <span
            className="fig"
            style={{ fontSize: 11, color: remaining < 20 ? "var(--oxblood)" : "var(--ink-faint)" }}
          >
            {remaining}
          </span>
        </div>
        <div style={{ marginTop: 6 }}>
          <textarea
            className="ta"
            style={{ height: 74 }}
            maxLength={CAP}
            value={memory}
            onChange={(event) => setMemory(event.target.value)}
            placeholder="Not the history of it. One thing."
          />
        </div>
        <p
          style={{
            margin: "8px 0 0",
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            lineHeight: 1.6,
            color: "var(--ink-3)",
          }}
        >
          One hundred and forty characters — the hook that rides on top of your photo in the feed.
        </p>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <div className="sc">
            the whole story{" "}
            <span style={{ textTransform: "none", letterSpacing: 0 }}>— optional</span>
          </div>
          <span className="fig" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
            {longWords} words
          </span>
        </div>
        <div style={{ marginTop: 6 }}>
          <textarea
            className="ta"
            style={{ height: 150 }}
            value={longread}
            onChange={(event) => setLongread(event.target.value)}
            placeholder="Where you kept it, who it belonged to, the day you almost let it go. Take your time — this is the part people open the story to read."
          />
        </div>

        <div style={{ marginTop: 20 }} className="rule-k" />
        <div className="sc" style={{ margin: "12px 0 7px" }}>
          this is what it becomes
        </div>
        <div
          style={{ position: "relative", height: 220, border: "var(--key)", overflow: "hidden" }}
        >
          <KeptPhoto
            category={CATEGORY}
            src={photo}
            alt="preview"
            style={{ position: "absolute", inset: 0 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(20,14,9,.92) 0%, rgba(20,14,9,.4) 45%, rgba(20,14,9,0) 72%)",
            }}
          />
          <div
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 14px 14px" }}
          >
            <div className="sc" style={{ color: "rgba(246,241,232,.72)" }}>
              {place || "—"} · {previous ? `${previous}’s` : arrival} · {year || "—"}
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontWeight: 700,
                fontSize: 20,
                color: "#f6f1e8",
                marginTop: 5,
              }}
            >
              Marta Ilves
            </div>
            <p
              style={{
                margin: "8px 0 0",
                fontFamily: "var(--serif)",
                fontWeight: 300,
                fontSize: 15.5,
                lineHeight: 1.42,
                color: "#f6f1e8",
              }}
            >
              “{memory || "—"}”
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 9, marginTop: 8 }}>
          <span className="sc">held {held} years</span>
          <span className="rule" style={{ flex: 1, transform: "translateY(-3px)" }} />
          <span className="sc">{longread.trim() ? "with a longread" : "computed, not typed"}</span>
        </div>
        <button
          className="btn"
          style={{ width: "100%", marginTop: 18 }}
          disabled={!memory || !photo}
        >
          Keep it
        </button>
      </div>
    </div>
  );
};
