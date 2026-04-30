import { Link } from "@remix-run/react";
import type { FC } from "react";

type Props = {
  title: string;
  description: string;
  headerImage: string;
  headerAlt: string;
  slug: string;
  publishedAt: string;
};

export const ProjectCard: FC<Props> = ({
  title,
  headerImage,
  headerAlt,
  slug,
  publishedAt,
  description,
}) => (
  <Link 
    to={`/projects/${slug}`}
    className="group flex flex-col bg-card/40 backdrop-blur-xl border border-border rounded-xl overflow-hidden shadow-lg hover:border-primary/40 hover:bg-card/50 transition-all duration-500"
  >
    <div className="h-64 w-full overflow-hidden relative">
      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
      <img
        alt={headerAlt}
        src={headerImage}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
    </div>
    <div className="p-8 flex flex-col gap-4 flex-grow">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h2>
        <span className="text-xs font-semibold text-muted-foreground pt-2">
          {new Date(publishedAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-muted-foreground line-clamp-3 mb-4 text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-auto flex flex-wrap gap-2">
        <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
          Case Study
        </span>
      </div>
    </div>
  </Link>
);
