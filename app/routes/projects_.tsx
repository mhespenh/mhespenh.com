import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProjectCard } from "~/components/project-card";
import { getProjects } from "~/graphql/projects";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | Projects" }];
};

export const loader = async () => {
  const projects = await getProjects();
  return json(projects);
};

export default function Projects() {
  const res = useLoaderData<typeof loader>();

  return (
    <div className="flex">
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
    </div>
  );
}
