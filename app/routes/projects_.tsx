// Projects index: every project as a card, filterable by tag.
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ProjectCard } from "~/components/project-card";
import { Chip } from "~/components/ui/chip";
import { Eyebrow } from "~/components/ui/eyebrow";
import { getProjects } from "~/graphql/projects";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | Projects" }];
};

export const loader = async () => {
  const projects = await getProjects();
  return json(projects);
};

const ALL = "all";

export default function Projects() {
  const res = useLoaderData<typeof loader>();
  const [activeTag, setActiveTag] = useState(ALL);

  const projects = res.projectCollection.items;
  const tags = [
    ...new Map(
      projects
        .flatMap((p) => p.contentfulMetadata.tags)
        .map((t) => [t.id, t] as const)
    ).values(),
  ];
  const filtered =
    activeTag === ALL
      ? projects
      : projects.filter((p) =>
          p.contentfulMetadata.tags.some((t) => t.id === activeTag)
        );

  const filters = [{ id: ALL, name: ALL }, ...tags];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Eyebrow>Projects</Eyebrow>
        <h1 className="font-display text-[clamp(32px,5vw,44px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink-1">
          Things I&apos;ve made
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTag(id)}
              aria-pressed={activeTag === id}
              className="rounded-full"
            >
              <Chip variant={activeTag === id ? "active" : "default"}>
                {name}
              </Chip>
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-ink-3">
            {filtered.length} of {projects.length}
          </span>
        </div>
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
        {filtered.map((p) => (
          <ProjectCard
            key={p.sys.id}
            title={p.title}
            description={p.description}
            headerAlt={p.headerImage.title}
            headerImage={p.headerImage.url}
            slug={p.slug}
            publishedAt={p.sys.publishedAt}
            tags={p.contentfulMetadata.tags}
          />
        ))}
      </div>
    </div>
  );
}
