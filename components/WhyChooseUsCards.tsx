"use client";

import React from "react";
import { motion } from "framer-motion";

interface Pillar {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export function WhyChooseUsCards({ pillars }: { pillars: Pillar[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
      {pillars.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 * i, ease: "easeOut" }}
          whileHover={{
            rotateX: 2,
            rotateY: 2,
            rotate: i % 2 === 0 ? 1.5 : -1.5,
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          className="bento-card"
          style={{
            ...(i === 0
              ? { background: "linear-gradient(145deg, #071218, #0d2532)", borderColor: "transparent" }
              : {}),
            cursor: "default",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: i === 0 ? "rgba(14,165,198,0.15)" : "rgba(14,165,198,0.1)",
              border: i === 0 ? "1px solid rgba(14,165,198,0.3)" : "1px solid rgba(14,165,198,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "18px",
              color: i === 0 ? "#7dd9ee" : "#0ea5c6",
            }}
          >
            {p.icon}
          </div>
          <h3
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              marginBottom: "10px",
              color: i === 0 ? "#f0f8fa" : "#0e2530",
            }}
          >
            {p.title}
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.7,
              color: i === 0 ? "rgba(200,230,240,0.78)" : "#567079",
            }}
          >
            {p.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
