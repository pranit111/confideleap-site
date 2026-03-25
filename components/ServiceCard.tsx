"use client";

import Link from "next/link";
import { FiBarChart2, FiFileText, FiMic, FiTarget, FiTrendingUp } from "react-icons/fi";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  "trending-up": FiTrendingUp,
  "target": FiTarget,
  "bar-chart-2": FiBarChart2,
  "file-text": FiFileText,
  "mic": FiMic,
};

interface ServiceCardProps {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  colors: {
    bg: string;
    accent: string;
    accentLight: string;
    text: string;
    border: string;
  };
}

export function ServiceCard({
  slug,
  title,
  subtitle,
  description,
  iconName,
  colors,
}: Readonly<ServiceCardProps>) {
  const Icon = iconMap[iconName] || FiTrendingUp;
  return (
    <Link
      href={`/services/${slug}`}
      className="card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        textDecoration: "none",
        background: colors.bg,
        border: `1.5px solid ${colors.border}`,
        borderRadius: "inherit",
        padding: "40px 35px",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform =
          "translateY(-8px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 30px 60px rgba(0, 0, 0, 0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform =
          "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
      }}
    >
      <div className="scroll-stack-card-inner">
        <div>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "20px",
              background: `rgba(255,255,255,0.15)`,
              backdropFilter: "blur(10px)",
              border: `1.5px solid ${colors.accentLight}`,
              color: colors.accentLight,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "28px",
              boxShadow: `0 8px 20px rgba(0,0,0,0.15)`,
              transition: "all 0.3s ease",
            }}
          >
            <Icon size={56} aria-hidden="true" />
          </div>
          <h3
            style={{
              fontWeight: 700,
              fontSize: "2.1rem",
              marginBottom: "20px",
              color: colors.text,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              color: colors.accentLight,
              fontSize: "1.25rem",
              lineHeight: 1.7,
              marginBottom: "24px",
              fontWeight: 500,
            }}
          >
            {subtitle}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            {description}
          </p>
        </div>
        <div
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: colors.accentLight,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.3s ease",
            }}
          >
            Explore Service →
          </span>
        </div>
      </div>
    </Link>
  );
}
