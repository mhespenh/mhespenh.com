import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProjectCard } from "~/components/project-card";
import { Heading } from "~/components/ui/heading";
import { getProjects } from "~/graphql/projects";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | Selected Works" }];
};

export const loader = async () => {
  const projects = await getProjects();
  return json(projects);
};

export default function Projects() {
  const res = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-24">
      {/* Page Header */}
      <header className="flex flex-col gap-6 max-w-3xl">
        <Heading>Selected Works</Heading>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A curated exploration of interactive experiences, scalable systems,
          and digital identities. Bridging the gap between robust engineering
          and high-fidelity design.
        </p>
      </header>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {res.projectCollection.items.map((p) => (
          <ProjectCard
            key={p.sys.id}
            title={p.title}
            description={p.description}
            headerAlt={p.headerImage.title}
            headerImage={p.headerImage.url}
            slug={p.slug}
            publishedAt={p.sys.publishedAt}
          />
        ))}
      </section>
    </div>
  );
}
