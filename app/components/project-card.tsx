// Glass card summarising one project, linking through to its detail page.
// The row layout puts the image beside the copy; the grid layout stacks them.
import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { FC } from "react";
import { Chip } from "~/components/ui/chip";
import { GlassCard } from "~/components/ui/glass-card";

type Props = {
  title: string;
  description: string;
  headerImage: string;
  headerAlt: string;
  slug: string;
  publishedAt: string;
  tags: { id: string; name: string }[];
  layout?: "grid" | "row";
};

export const ProjectCard: FC<Props> = ({
  title,
  headerImage,
  headerAlt,
  slug,
  publishedAt,
  description,
  tags,
  layout = "grid",
}) => (
  <Link
    to={`/projects/${slug}`}
    className="card-link flex min-w-0 hover:-translate-y-0.5"
  >
    <GlassCard className="w-full">
      <div
        className={clsx(
          "grid gap-5",
          layout === "row" ? "sm:grid-cols-3" : "grid-cols-1 gap-3.5"
        )}
      >
        <img
          className={clsx(
            "w-full rounded-xl bg-[var(--tile-bg)] object-cover [box-shadow:var(--neu-shadow-in)]",
            layout === "row"
              ? "h-full max-h-[180px] min-h-[136px]"
              : "h-[180px]"
          )}
          src={headerImage}
          alt={headerAlt}
        />
        <div
          className={clsx(
            "flex min-w-0 flex-col gap-2.5",
            layout === "row" && "sm:col-span-2"
          )}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2
              className={clsx(
                "font-display font-bold text-ink-1",
                layout === "row" ? "text-[22px]" : "text-xl"
              )}
            >
              {title}
            </h2>
            <span className="shrink-0 font-mono text-xs text-ink-3">
              {publishedAt.slice(0, 10)}
            </span>
          </div>
          <p
            className={clsx(
              "leading-[1.55] text-ink-2",
              layout === "row" ? "text-[15px]" : "text-sm"
            )}
          >
            {description}
          </p>
          <div
            className={clsx(
              "flex flex-wrap gap-1.5",
              layout === "row" && "mt-auto"
            )}
          >
            {tags.map((t) => (
              <Chip key={t.id}>{t.name}</Chip>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  </Link>
);
