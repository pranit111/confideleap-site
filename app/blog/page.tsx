import type { Metadata } from "next";
import { createImageUrlBuilder } from "@sanity/image-url";
import Link from "next/link";

import { getAllPosts } from "../../lib/content";
import { Component } from "../../components/ui/blog-posts";
import localPosts from "../../content/posts.json";
import type { Post } from "../../lib/content";
import { sanityClient } from "../../lib/sanity";
import { RippleButton } from "../../components/ui/multi-type-ripple-buttons";

const darkRippleClass = "rounded-[10px] border border-[rgba(255,255,255,0.15)] bg-transparent font-semibold leading-[1.2]";

export const metadata: Metadata = {
  title: "Blog – Finance Insights, Updates & Trends | ConfideLeap",
  description:
    "Explore ConfideLeap's blog for the latest insights, trends, and expert advice on investor relations, digital marketing, public relations and much more.",
};

const builder = createImageUrlBuilder(sanityClient);

const fallbackImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
];

function estimateReadTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 180));
}

export default async function BlogPage() {
  const cmsPosts = await getAllPosts();

  const fallbackPosts: Post[] = localPosts.map((post) => ({
    ...post,
    categoryColor: "#0ea5c6",
    categoryRgb: "14,165,198",
    coverImage: undefined,
    author: "ConfideLeap Team",
    tags: [],
    body: [],
  }));

  const mergedMap = new Map<string, Post>();
  [...fallbackPosts, ...cmsPosts].forEach((post) => {
    mergedMap.set(post.slug, post);
  });

  const posts = (cmsPosts.length >= 6 ? cmsPosts : Array.from(mergedMap.values()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const blogCards = posts.slice(0, 3).map((post, index) => ({
    id: index + 1,
    title: post.title,
    category: post.categoryLabel,
    href: `/blog/${post.slug}`,
    imageUrl: post.coverImage
      ? builder.image(post.coverImage).width(1600).height(900).fit("crop").url()
      : fallbackImages[index % fallbackImages.length],
    readTime: estimateReadTime(post.excerpt),
  }));

  return (
    <>
      <section className="section-dark grid-lines" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-15%", right: "-8%", width: "52vw", height: "52vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.2) 0%, transparent 70%)" }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-22%", left: "-10%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.16) 0%, transparent 72%)" }} />
          <span className="anim-spin-slow" style={{ position: "absolute", top: "8%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(14,165,198,0.14)" }} />
          <span className="anim-spin-slow-rev" style={{ position: "absolute", top: "5%", right: "7%", width: "380px", height: "380px", borderRadius: "50%", border: "1px dashed rgba(14,165,198,0.08)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="anim-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(14,165,198,0.12)", border: "1px solid rgba(14,165,198,0.28)", marginBottom: "28px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#12abc9" }} className="ping-dot" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7dd9ee" }}>Our Blog</span>
          </div>

          <h1 className="anim-fade-up delay-100" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.02, marginBottom: "22px", color: "#f0f8fa", maxWidth: "820px" }}>
            Finance Insights,<br />
            <span className="shimmer-text">Updates & Trends</span>
          </h1>

          <p className="anim-fade-up delay-200" style={{ fontSize: "clamp(1rem, 1.9vw, 1.15rem)", color: "rgba(210,235,242,0.7)", maxWidth: "620px", lineHeight: 1.8, marginBottom: "40px" }}>
            Expert perspectives on investor relations, digital marketing, and advisory communication from the ConfideLeap team.
          </p>

          <div className="anim-fade-up delay-300" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ padding: "13px 26px" }}>
              Talk to Our Experts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <RippleButton variant="hover" hoverRippleColor="rgba(14,165,198,0.35)" className={darkRippleClass}>
              <Link href="/services" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(200,235,242,0.8)", textDecoration: "none", padding: "12px 24px" }}>
                Explore Services
              </Link>
            </RippleButton>
          </div>
        </div>
      </section>

      <section style={{ position: "relative", overflow: "hidden", paddingTop: "24px", paddingBottom: "72px", background: "linear-gradient(180deg, #f8fbfd 0%, #eef5f8 100%)", borderTop: "1px solid rgba(18,52,63,0.08)" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Component
            title="Our Most Popular Articles"
            description="Discover the most engaging content from ConfideLeap on investor relations, digital growth, and strategic communications."
            posts={blogCards}
            theme="light"
          />
        </div>
      </section>
    </>
  );
}
