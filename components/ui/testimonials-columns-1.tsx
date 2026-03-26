"use client";
import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

export interface Testimonial {
  text: string;
  image: string | null;
  name: string;
  role: string;
}

interface ColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  paused?: boolean;
  wheelDelta?: number;
}

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 10,
  paused = false,
  wheelDelta = 0,
}: ColumnProps) => {
  const y = useMotionValue(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const halfHeightRef = useRef(0);
  const prevWheelRef = useRef(0);

  useEffect(() => {
    if (wrapperRef.current) {
      halfHeightRef.current = wrapperRef.current.scrollHeight / 2;
    }
  }, [testimonials]);

  // Auto-scroll: move up continuously
  useAnimationFrame((_, delta) => {
    if (paused || halfHeightRef.current === 0) return;
    const pxPerMs = halfHeightRef.current / (duration * 1000);
    let next = y.get() - pxPerMs * delta;
    if (next <= -halfHeightRef.current) next += halfHeightRef.current;
    y.set(next);
  });

  // Wheel nudge: scrolling within the section drives the columns
  useEffect(() => {
    const diff = wheelDelta - prevWheelRef.current;
    prevWheelRef.current = wheelDelta;
    if (diff === 0 || halfHeightRef.current === 0) return;
    let next = y.get() - diff * 0.6;
    if (next <= -halfHeightRef.current) next += halfHeightRef.current;
    if (next > 0) next -= halfHeightRef.current;
    y.set(next);
  }, [wheelDelta, y]);

  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div ref={wrapperRef} style={{ y }} className="flex flex-col gap-5">
        {(["a", "b"] as const).map((copy) => (
          <React.Fragment key={copy}>
            {testimonials.map(({ text, image, name, role }) => (
              <div
                key={`${copy}-${name}`}
                style={{
                  padding: "24px",
                  borderRadius: "20px",
                  background: "rgba(20, 55, 70, 0.55)",
                  border: "1px solid rgba(14,165,198,0.18)",
                  width: "280px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <p style={{ color: "#c8dce3", fontSize: "0.88rem", lineHeight: 1.7 }}>{text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px" }}>
                  <img
                    width={40}
                    height={40}
                    src={image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d6779&color=fff&size=80`}
                    alt={name}
                    style={{ width: "40px", height: "40px", borderRadius: "999px", objectFit: "cover", border: "2px solid rgba(14,165,198,0.3)" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#ffffff", lineHeight: 1.3 }}>{name}</div>
                    <div style={{ fontSize: "0.78rem", color: "#7aacba", lineHeight: 1.3 }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
