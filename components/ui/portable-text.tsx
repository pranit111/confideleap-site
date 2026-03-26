"use client";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { createImageUrlBuilder } from "@sanity/image-url";
import Link from "next/link";

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "zcprlk2a",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
});

interface ArticleBodyProps {
  body: unknown[];
  accentColor?: string;
  accentRgb?: string;
}

export function ArticleBody({ body, accentColor = "#0ea5c6", accentRgb = "14,165,198" }: ArticleBodyProps) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#2e4a54", marginBottom: "22px" }}>
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
          fontWeight: 800,
          color: "#0e2530",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          marginTop: "44px",
          marginBottom: "16px",
          paddingBottom: "10px",
          borderBottom: `2px solid rgba(${accentRgb},0.15)`,
        }}>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
          fontWeight: 700,
          color: "#0e2530",
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
          marginTop: "32px",
          marginBottom: "12px",
        }}>
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "#1a3a45",
          marginTop: "24px",
          marginBottom: "10px",
        }}>
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote style={{
          borderLeft: `4px solid ${accentColor}`,
          paddingLeft: "24px",
          paddingTop: "4px",
          paddingBottom: "4px",
          marginTop: "28px",
          marginBottom: "28px",
          background: `rgba(${accentRgb},0.04)`,
          borderRadius: "0 12px 12px 0",
        }}>
          <p style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "1.08rem",
            lineHeight: 1.8,
            color: "#2a4a56",
            fontStyle: "italic",
            fontWeight: 500,
            margin: 0,
          }}>
            {children}
          </p>
        </blockquote>
      ),
    },

    marks: {
      strong: ({ children }) => (
        <strong style={{ fontWeight: 700, color: "#0e2530" }}>{children}</strong>
      ),
      em: ({ children }) => <em>{children}</em>,
      underline: ({ children }) => (
        <span style={{ textDecoration: "underline" }}>{children}</span>
      ),
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target={value?.blank ? "_blank" : "_self"}
          rel={value?.blank ? "noopener noreferrer" : undefined}
          style={{ color: accentColor, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          {children}
        </a>
      ),
    },

    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        const url = imageBuilder.image(value).width(880).auto("format").url();
        return (
          <figure style={{ margin: "36px 0" }}>
            <img
              src={url}
              alt={value.alt ?? ""}
              style={{ width: "100%", borderRadius: "14px", display: "block", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
            />
            {value.caption && (
              <figcaption style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "#7a9099",
                marginTop: "10px",
                fontStyle: "italic",
              }}>
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },

      faqItem: ({ value }) => (
        <div style={{
          marginTop: "20px",
          marginBottom: "20px",
          padding: "20px 24px",
          borderRadius: "14px",
          background: `rgba(${accentRgb},0.05)`,
          border: `1px solid rgba(${accentRgb},0.18)`,
        }}>
          <h4 style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            fontSize: "0.97rem",
            color: "#0e2530",
            marginBottom: "10px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}>
            <span style={{
              flexShrink: 0,
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: accentColor,
              color: "#fff",
              fontSize: "0.7rem",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1px",
            }}>Q</span>
            {value.question}
          </h4>
          <p style={{
            fontSize: "0.9rem",
            lineHeight: 1.75,
            color: "#3a5a66",
            margin: "0 0 0 32px",
          }}>
            {value.answer}
          </p>
        </div>
      ),

      ctaBanner: ({ value }) => (
        <div style={{
          marginTop: "36px",
          marginBottom: "36px",
          padding: "32px 36px",
          borderRadius: "20px",
          background: `linear-gradient(135deg, rgba(${accentRgb},0.12), rgba(${accentRgb},0.06))`,
          border: `1px solid rgba(${accentRgb},0.25)`,
          textAlign: "center",
        }}>
          {value.heading && (
            <h3 style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "1.25rem",
              color: "#0e2530",
              marginBottom: "10px",
            }}>
              {value.heading}
            </h3>
          )}
          {value.subtext && (
            <p style={{ fontSize: "0.92rem", color: "#456270", lineHeight: 1.7, marginBottom: "20px" }}>
              {value.subtext}
            </p>
          )}
          {value.buttonLabel && (
            <Link
              href={value.buttonHref ?? "/contact"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                borderRadius: "10px",
                background: accentColor,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                boxShadow: `0 8px 24px rgba(${accentRgb},0.3)`,
              }}
            >
              {value.buttonLabel}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          )}
        </div>
      ),

      statCallout: ({ value }) => (
        <div style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 32px",
          borderRadius: "16px",
          background: `rgba(${accentRgb},0.08)`,
          border: `1px solid rgba(${accentRgb},0.2)`,
          margin: "20px auto",
          textAlign: "center",
          width: "100%",
        }}>
          <span style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 900,
            color: accentColor,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}>
            {value.value}
          </span>
          {value.label && (
            <span style={{ fontSize: "0.88rem", color: "#567079", marginTop: "8px", fontWeight: 600 }}>
              {value.label}
            </span>
          )}
        </div>
      ),
    },
  };

  return (
    <div style={{ lineHeight: 1.85 }}>
      <PortableText value={body as Parameters<typeof PortableText>[0]["value"]} components={components} />
    </div>
  );
}
