import Link from "next/link";
import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  href: string;
  readTime?: number;
  className?: string;
}

interface GridSectionProps {
  title: string;
  description: string;
  backgroundLabel?: string;
  backgroundPosition?: "left" | "right";
  posts?: BlogPost[];
  className?: string;
  theme?: "dark" | "light";
}

export const Component = ({
  title,
  description,
  backgroundLabel,
  backgroundPosition = "left",
  posts = [],
  className,
  theme = "dark",
}: Readonly<GridSectionProps>) => {
  const isLight = theme === "light";

  return (
    <section className={cn("relative mx-auto py-6 md:py-10", className)}>
      <h2 className={cn("mb-3 text-center font-[Outfit] text-3xl font-black capitalize leading-[1.15] tracking-[-0.02em] md:text-5xl lg:text-6xl", isLight ? "text-[#0e2530]" : "text-white")}>
        {title}
      </h2>

      {backgroundLabel && (
        <span
          className={cn(
            "pointer-events-none absolute -top-3 -z-10 hidden select-none font-extrabold leading-[1] md:block md:text-[160px] lg:text-[240px]",
            isLight ? "text-[#0e2530]/[0.05]" : "text-white/[0.04]",
            backgroundPosition === "left" ? "-left-[8%]" : "-right-[10%]",
          )}
        >
          {backgroundLabel}
        </span>
      )}

      <p className={cn("mx-auto mb-10 max-w-[900px] text-center text-base leading-[1.8] md:text-[1.38rem] md:leading-[1.75]", isLight ? "text-[#4a6370]" : "text-white/72")}>
        {description}
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:auto-rows-[290px] lg:grid-cols-[1fr_0.62fr] lg:auto-rows-[290px]">
        {posts.map((post, index) => {
          const {
            id,
            title: postTitle,
            category,
            imageUrl,
            href,
            readTime,
            className: postClassName,
          } = post;

          const isPrimary = index === 0;
          const arrowSize = isPrimary ? 40 : 30;

          return (
            <Link
              href={href}
              key={id || index}
              style={{ backgroundImage: `url(${imageUrl})` }}
              className={cn(
                "group relative row-span-1 flex min-h-[290px] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat p-4 text-white transition-all duration-300 hover:scale-[0.985] md:p-5",
                isPrimary &&
                  "col-span-1 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-1 lg:row-span-2",
                postClassName,
              )}
            >
              <div className="absolute inset-0 -z-0 h-[130%] w-full bg-gradient-to-t from-black/88 via-black/50 to-transparent transition-all duration-500 group-hover:h-full" />

              <article className="relative z-0 h-full">
                <div className="flex h-full min-w-0 flex-col justify-end gap-3 pr-12">
                  <h3 className={cn("line-clamp-2 break-words font-semibold leading-tight text-white", isPrimary ? "text-2xl md:text-3xl" : "min-h-[3.8rem] text-xl md:min-h-[4.2rem] md:text-[1.75rem]")}>
                    {postTitle}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-fit rounded-md bg-white/28 px-2 py-1 text-xs font-semibold text-white/95 capitalize backdrop-blur-md md:text-sm">
                      {category}
                    </span>
                    {readTime ? (
                      <div className="text-xs font-medium text-white/90 md:text-sm">{readTime} min read</div>
                    ) : null}
                  </div>
                </div>
                <MoveRight
                  className="absolute right-1 bottom-1 shrink-0 text-white/95 transition-all duration-300 group-hover:translate-x-2"
                  color="white"
                  width={arrowSize}
                  height={arrowSize}
                  strokeWidth={1.25}
                />
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
