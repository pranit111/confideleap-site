import Link from 'next/link';
import { createImageUrlBuilder } from '@sanity/image-url';

import type { Post } from '@/lib/content';
import { sanityClient } from '@/lib/sanity';
import { LazyImage } from '@/components/ui/lazy-image';

interface BlogSectionProps {
  posts: Post[];
}

const fallbackImages = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
];

const builder = createImageUrlBuilder(sanityClient);

function getPostImage(post: Post, index: number) {
  if (post.coverImage) {
    return builder.image(post.coverImage).width(1200).height(675).fit('crop').url();
  }
  return fallbackImages[index % fallbackImages.length];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function BlogSection({ posts }: Readonly<BlogSectionProps>) {
  return (
    <div className="w-full">
      <div className="space-y-2 pb-8">
        <h1 className="font-mono text-4xl font-bold tracking-wide text-white">Blog Section</h1>
        <p className="text-base text-slate-300">
          Discover the latest trends and insights in investor relations, advisory, and growth communication.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-white/15 bg-white/5 p-8 text-center text-slate-300">
          No blog posts found.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group why-card-tilt flex flex-col gap-3 rounded-xl border border-white/15 bg-white/95 p-3 text-inherit no-underline shadow-[0_10px_30px_rgba(2,20,30,0.15)]"
            >
              <LazyImage
                src={getPostImage(post, index)}
                fallback={fallbackImages[(index + 1) % fallbackImages.length]}
                inView={true}
                alt={post.title}
                ratio={16 / 9}
                className="transition-all duration-500 group-hover:scale-[1.04]"
              />

              <div className="space-y-2 px-1 pb-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 sm:text-xs">
                  <p>{post.author ? `by ${post.author}` : 'by ConfideLeap Team'}</p>
                  <div className="size-1 rounded-full bg-slate-400" />
                  <p>{formatDate(post.date)}</p>
                  <div className="size-1 rounded-full bg-slate-400" />
                  <p>5 min read</p>
                </div>

                <h2 className="line-clamp-2 text-lg leading-6 font-semibold tracking-tight text-slate-900">
                  {post.title}
                </h2>

                <p className="line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
