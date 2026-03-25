import { Component } from "@/components/ui/blog-posts";

export default function DemoOne() {
  return (
    <Component
      title="Our Most Popular Articles of 2024!"
      description="Discover the most engaging content from our amazing community of developers and designers"
      backgroundLabel="BLOG"
      backgroundPosition="left"
      posts={[
        {
          id: 1,
          title: "Building Modern Web Applications with React",
          category: "Web Development",
          imageUrl:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
          href: "#",
          readTime: 8,
        },
        {
          id: 2,
          title: "Advanced TypeScript Patterns",
          category: "Programming",
          imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
          href: "#",
          readTime: 12,
        },
        {
          id: 3,
          title: "Design System Best Practices",
          category: "UI/UX Design",
          imageUrl:
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80",
          href: "#",
          readTime: 6,
        },
      ]}
      className="mb-16"
    />
  );
}
