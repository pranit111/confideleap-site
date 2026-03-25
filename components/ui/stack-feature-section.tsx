"use client";

import Link from "next/link";
import { FaChartLine } from "react-icons/fa";
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";

const whiteRippleClass = "rounded-full border border-[rgba(14,165,198,0.35)] bg-white text-[#0e5d74] text-[0.95rem] font-semibold leading-[1.2] shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0a3f4f]";

interface OurHistorySectionProps {
  industries: string[];
}

const orbitDurations = [20, 30, 42];

export default function OurHistorySection({ industries }: OurHistorySectionProps) {
  const orbitCount = 3;
  const iconsPerOrbit = Math.ceil(industries.length / orbitCount);

  const orbits = Array.from({ length: orbitCount }, (_, i) =>
    industries.slice(i * iconsPerOrbit, i * iconsPerOrbit + iconsPerOrbit)
  );

  return (
    <div
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "28rem", background: "#ffffff" }}
    >
      {/* Left side */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{ width: "48%", padding: "3rem 2rem 3rem 3rem" }}
      >
        <span style={{
          fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase",
          letterSpacing: "0.12em", color: "#0ea5c6", display: "block", marginBottom: "12px",
        }}>
          Our History
        </span>
        <h2 style={{
          fontFamily: "Outfit, sans-serif", fontWeight: 900,
          fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em",
          color: "#0e2530", marginBottom: "20px", lineHeight: 1.15,
        }}>
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

      {/* Right side: Orbit animation */}
      <div
        className="absolute"
        style={{ right: 0, top: "50%", transform: "translateY(-50%)", width: "52%", height: "100%", overflow: "hidden" }}
      >
        {/* Orbit system — pushed right so only ~half is visible */}
        <div
          className="absolute"
          style={{
            width: "44rem",
            height: "44rem",
            top: "50%",
            left: "55%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Center circle */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: "5rem", height: "5rem",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #0ea5c6, #0891b2)",
              boxShadow: "0 0 32px rgba(14,165,198,0.35)",
              zIndex: 10,
            }}
          >
            <FaChartLine style={{ width: "1.75rem", height: "1.75rem", color: "#ffffff" }} />
          </div>

          {/* Orbits */}
          {orbits.map((orbitItems, orbitIdx) => {
            const diameter = 12 + 10 * (orbitIdx + 1); // rem: 22, 32, 42
            const duration = orbitDurations[orbitIdx];
            const angleStep = (2 * Math.PI) / orbitItems.length;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full"
                style={{
                  width: `${diameter}rem`,
                  height: `${diameter}rem`,
                  top: "50%",
                  left: "50%",
                  marginTop: `-${diameter / 2}rem`,
                  marginLeft: `-${diameter / 2}rem`,
                  border: "1px dashed rgba(14,165,198,0.22)",
                  animation: `orbitSpin${orbitIdx} ${duration}s linear infinite`,
                }}
              >
                {orbitItems.map((label, itemIdx) => {
                  const angle = itemIdx * angleStep;
                  const x = 50 + 50 * Math.cos(angle);
                  const y = 50 + 50 * Math.sin(angle);

                  return (
                    <div
                      key={itemIdx}
                      className="absolute"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      {/* Counter-rotate so text stays upright */}
                      <div
                        style={{
                          transform: "translate(-50%, -50%)",
                          animation: `counterSpin${orbitIdx} ${duration}s linear infinite`,
                        }}
                      >
                        <span style={{
                          display: "inline-block",
                          padding: "5px 12px",
                          borderRadius: "100px",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          background: orbitIdx === 0
                            ? "rgba(14,165,198,0.12)"
                            : orbitIdx === 1
                            ? "rgba(8,127,158,0.08)"
                            : "#f5f7f8",
                          border: orbitIdx === 0
                            ? "1px solid rgba(14,165,198,0.3)"
                            : orbitIdx === 1
                            ? "1px solid rgba(8,127,158,0.22)"
                            : "1px solid rgba(18,52,63,0.12)",
                          color: orbitIdx === 0 ? "#0b7f9f" : "#3e5963",
                          boxShadow: "0 2px 8px rgba(14,165,198,0.1)",
                        }}>
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes orbitSpin0 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitSpin1 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitSpin2 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes counterSpin0 {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes counterSpin1 {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes counterSpin2 {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
