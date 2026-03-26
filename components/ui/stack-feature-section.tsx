"use client";

import Link from "next/link";
import { FaChartLine } from "react-icons/fa";
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";

const whiteRippleClass = "rounded-full border border-[rgba(14,165,198,0.35)] bg-white text-[#0e5d74] text-[0.95rem] font-semibold leading-[1.2] shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0a3f4f]";

interface OurHistorySectionProps {
  industries: string[];
}

export default function OurHistorySection({ industries }: Readonly<OurHistorySectionProps>) {
  return (
    <div
      className="relative"
      style={{ background: "#ffffff" }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "28px",
          alignItems: "center",
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
      >
        <div className="relative z-10 flex flex-col justify-center">
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#0ea5c6",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Our History
          </span>
          <h2
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
              letterSpacing: "-0.03em",
              color: "#0e2530",
              marginBottom: "20px",
              lineHeight: 1.15,
            }}
          >
            Industry Experience
          </h2>
          <p style={{ color: "#567079", lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "32px" }}>
            For two decades, we&apos;ve worked as executives, analysts, and financial journalists.
            We quickly immerse ourselves in your competitive landscape for each client engagement.
          </p>
          <RippleButton variant="hover" hoverRippleColor="#0ea5c6" className={`${whiteRippleClass} self-start`}>
            <Link href="/contact" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit", padding: "10px 20px" }}>
              Work With Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </RippleButton>
        </div>

        <div
          style={{
            borderRadius: "22px",
            border: "1px solid rgba(14,165,198,0.18)",
            background: "linear-gradient(160deg, #f7fbfd 0%, #ffffff 45%, #f0f8fb 100%)",
            padding: "clamp(16px, 2.5vw, 28px)",
            boxShadow: "0 14px 36px rgba(9, 70, 86, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #0ea5c6, #0891b2)",
                boxShadow: "0 8px 18px rgba(14,165,198,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaChartLine style={{ width: "0.95rem", height: "0.95rem", color: "#ffffff" }} />
            </div>
            <span style={{ fontWeight: 700, color: "#0d4b5d", fontSize: "0.9rem" }}>Industries We Serve</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
            {industries.map((label) => (
              <span
                key={label}
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  background: "rgba(14,165,198,0.1)",
                  border: "1px solid rgba(14,165,198,0.24)",
                  color: "#0b7f9f",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
