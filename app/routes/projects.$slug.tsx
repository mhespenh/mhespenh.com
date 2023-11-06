import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Github } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { getProjectBySlug } from "~/graphql/project";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | Projects" }];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  const project = await getProjectBySlug(slug!);
  return json(project);
};

export default function Project() {
  const {
    title,
    githubLink,
    sys: { publishedAt },
    contentfulMetadata: { tags },
    body: { json },
  } = useLoaderData<typeof loader>();

  return (
    <div className="prose dark:prose-invert">
      <h1>{title}</h1>
      <p>{new Date(publishedAt).toLocaleDateString()}</p>
      <p className="">
        {tags.map((t) => (
          <Badge key={t.id} className="m-1">
            {t.name}
          </Badge>
        ))}
      </p>
      <a
        href={githubLink}
        rel="noopener noreferrer"
        target="_blank"
        className="flex items-center gap-2"
      >
        <Github size={24} />
        View at Github.com
      </a>
      {documentToReactComponents(json)}
    </div>
  );
}
