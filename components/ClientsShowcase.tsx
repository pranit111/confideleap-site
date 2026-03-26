"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Client } from "../lib/content";

const industryMeta: Record<string, { color: string; rgb: string }> = {
  Chemicals:          { color: "#3b82f6", rgb: "59,130,246" },
  Infrastructure:     { color: "#8b5cf6", rgb: "139,92,246" },
  Pharmaceuticals:    { color: "#10b981", rgb: "16,185,129" },
  Healthcare:         { color: "#10b981", rgb: "16,185,129" },
  Manufacturing:      { color: "#f59e0b", rgb: "245,158,11" },
  Aquaculture:        { color: "#06b6d4", rgb: "6,182,212" },
  Environment:        { color: "#22c55e", rgb: "34,197,94" },
  "Renewable Energy": { color: "#fbbf24", rgb: "251,191,36" },
  "Oil & Gas":        { color: "#ef4444", rgb: "239,68,68" },
  "Agricultural Export": { color: "#a3e635", rgb: "163,230,53" },
  FMCG:               { color: "#a855f7", rgb: "168,85,247" },
  Fintech:            { color: "#0ea5c6", rgb: "14,165,198" },
};

const fallback = { color: "#0ea5c6", rgb: "14,165,198" };

function getMeta(industry: string) {
  return industryMeta[industry] ?? fallback;
}

// ── Marquee ─────────────────────────────────────────────────────────────────

function MarqueeRow({ clients, reverse = false }: { clients: Client[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // CSS animation direction handled via inline style
  const items = [...clients, ...clients]; // duplicate for seamless loop

  return (
    <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "12px",
          width: "max-content",
          animation: `marquee-scroll 40s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {items.map((client, i) => {
          const m = getMeta(client.industry);
          return (
            <div
              key={`${client.slug}-${i}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 18px",
                borderRadius: "100px",
                background: `rgba(${m.rgb}, 0.07)`,
                border: `1px solid rgba(${m.rgb}, 0.2)`,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: `rgba(${m.rgb}, 0.18)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  color: m.color,
                }}
              >
                {client.name.charAt(0)}
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(180,215,228,0.75)" }}>
                {client.name}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: m.color,
                  background: `rgba(${m.rgb}, 0.12)`,
                  padding: "2px 8px",
                  borderRadius: "100px",
                }}
              >
                {client.industry}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

function ClientCard({ client, large = false }: { client: Client; large?: boolean }) {
  const m = getMeta(client.industry);

  return (
    <Link
      href={`/clients/${client.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: large ? "36px" : "28px",
        borderRadius: "20px",
        background: "rgba(11,30,40,0.9)",
        border: `1px solid rgba(${m.rgb}, 0.18)`,
        position: "relative",
        overflow: "hidden",
        textDecoration: "none",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        height: "100%",
        backdropFilter: "blur(6px)",
        // @ts-ignore
        "--card-rgb": m.rgb,
      }}
      className="client-card"
    >
      {/* Top glow accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
        }}
      />

      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${m.rgb},0.08) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Watermark initial */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-12px",
          right: "-8px",
          fontFamily: "Outfit, sans-serif",
          fontWeight: 900,
          fontSize: large ? "8rem" : "6rem",
          color: `rgba(${m.rgb}, 0.04)`,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.05em",
        }}
      >
        {client.name.charAt(0)}
      </div>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
        <div
          style={{
            width: large ? "60px" : "48px",
            height: large ? "60px" : "48px",
            borderRadius: "16px",
            background: `rgba(${m.rgb}, 0.12)`,
            border: `1px solid rgba(${m.rgb}, 0.3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 900,
            fontSize: large ? "1.4rem" : "1.15rem",
            color: m.color,
            flexShrink: 0,
          }}
        >
          {client.name.charAt(0)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                color: m.color,
                background: `rgba(${m.rgb}, 0.1)`,
                border: `1px solid rgba(${m.rgb}, 0.22)`,
                padding: "3px 10px",
                borderRadius: "100px",
              }}
            >
              {client.industry}
            </span>
            {client.featured && (
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#fbbf24",
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.22)",
                  padding: "3px 10px",
                  borderRadius: "100px",
                }}
              >
                Featured
              </span>
            )}
          </div>
          <h3
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: large ? "1.1rem" : "0.95rem",
              color: "#e8f4f8",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {client.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "0.82rem",
          color: "rgba(180,215,228,0.6)",
          lineHeight: 1.75,
          marginBottom: "20px",
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: large ? 4 : 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {client.description}
      </p>

      {/* Services */}
      {client.services && client.services.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {client.services.slice(0, large ? 4 : 3).map((svc) => (
            <span
              key={svc}
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "rgba(180,215,228,0.55)",
                background: "rgba(14,165,198,0.06)",
                border: "1px solid rgba(14,165,198,0.14)",
                padding: "3px 10px",
                borderRadius: "100px",
              }}
            >
              {svc}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "16px",
          borderTop: `1px solid rgba(${m.rgb}, 0.1)`,
        }}
      >
        {client.website ? (
          <span style={{ fontSize: "0.72rem", color: "rgba(180,215,228,0.35)", fontFamily: "monospace" }}>
            {client.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        ) : (
          <span />
        )}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: m.color,
          }}
        >
          View profile
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ClientsShowcase({ clients }: { clients: Client[] }) {
  const featured = clients.filter((c) => c.featured);
  const rest = clients.filter((c) => !c.featured);

  // Split for marquee rows
  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half);
  const row2 = clients.slice(half);

  return (
    <>
      {/* ── Marquee Strip ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "#071820",
          borderTop: "1px solid rgba(14,165,198,0.08)",
          borderBottom: "1px solid rgba(14,165,198,0.08)",
          padding: "32px 0",
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .client-card:hover {
            transform: translateY(-4px);
            border-color: rgba(var(--card-rgb), 0.4) !important;
            box-shadow: 0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(var(--card-rgb), 0.15);
          }
        `}</style>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <MarqueeRow clients={row1.length >= 2 ? row1 : clients} />
          <MarqueeRow clients={row2.length >= 2 ? row2 : clients} reverse />
        </div>
      </section>

      {/* ── Bento Grid ────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(180deg, #071820 0%, #051319 100%)",
          padding: "80px 0 100px",
        }}
      >
        <div className="container">
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#0ea5c6",
                marginBottom: "12px",
              }}
            >
              Our Clients
            </p>
            <h2
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 900,
                color: "#e8f4f8",
                letterSpacing: "-0.035em",
                margin: 0,
              }}
            >
              Trusted Partners Across Industries
            </h2>
          </div>

          {/* Featured row — 2 large cards */}
          {featured.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {featured.map((client) => (
                <ClientCard key={client.slug} client={client} large />
              ))}
            </div>
          )}

          {/* Rest — standard 3-col grid */}
          {rest.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {rest.map((client) => (
                <ClientCard key={client.slug} client={client} />
              ))}
            </div>
          )}

          {clients.length === 0 && (
            <p style={{ textAlign: "center", color: "rgba(180,215,228,0.4)", padding: "60px 0" }}>
              No clients found.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
