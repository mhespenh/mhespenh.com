// About page: the intro, the three most recent projects and where to find me.
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ProjectCard } from "~/components/project-card";
import { Eyebrow } from "~/components/ui/eyebrow";
import { GlassCard } from "~/components/ui/glass-card";
import { getProjects } from "~/graphql/projects";
import { socialLinks } from "~/lib/social-links";

export const loader = async () => {
  const { projectCollection } = await getProjects();
  const featured = [...projectCollection.items]
    .sort((a, b) => b.sys.publishedAt.localeCompare(a.sys.publishedAt))
    .slice(0, 3);

  return json(featured);
};

export default function About() {
  const featured = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-[72px]">
      <div className="flex flex-col gap-6">
        <Eyebrow>Software engineer · Maker</Eyebrow>
        <h1 className="[text-wrap:pretty] font-display text-[clamp(34px,6vw,52px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-1">
          Computer nerd extraordinaire. Software engineer. Maker/breaker of all
          manner of things.
        </h1>
        <p className="max-w-[620px] text-[19px] leading-[1.6]">
          I am a Software Engineer with a passion for&nbsp;
          <strong className="font-semibold text-indigo">creating</strong> stuff.
        </p>
        <p className="max-w-[620px] text-[19px] leading-[1.6]">
          Hardware and software; frontend and backend; wood, metal, leather, and
          plastic. If you can&nbsp;
          <strong className="font-semibold text-indigo">make</strong> something
          &nbsp; from it, chances are I'm interested in it.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <Eyebrow>Projects</Eyebrow>
          <Link
            to="/projects"
            className="text-sm font-medium text-indigo hover:text-violet"
          >
            All projects →
          </Link>
        </div>
        {featured.map((p) => (
          <ProjectCard
            key={p.sys.id}
            layout="row"
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

      <div className="flex flex-col gap-4">
        <Eyebrow>Find me around the web</Eyebrow>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {socialLinks.map(({ name, handle, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link block"
            >
              <GlassCard className="w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] text-ink-3">{name}</span>
                  <span className="break-words font-mono text-[13px] text-ink-1">
                    {handle}
                  </span>
                </div>
              </GlassCard>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
