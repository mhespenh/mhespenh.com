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
    body: { json, links },
  } = useLoaderData<typeof loader>();

  return (
    <div className="prose dark:prose-invert">
      <h1>{title}</h1>
      <p>{new Date(publishedAt).toLocaleDateString()}</p>
      <div className="">
        {tags.map((t) => (
          <Badge key={t.id} className="m-1">
            {t.name}
          </Badge>
        ))}
      </div>
      <a
        href={githubLink}
        rel="noopener noreferrer"
        target="_blank"
        className="flex items-center gap-2"
      >
        <Github size={24} />
        View at Github.com
      </a>
      {documentToReactComponents(json, {
        renderNode: {
          "embedded-asset-block": (node) => {
            const assetId = node.data.target.sys.id;
            const asset = links.assets.block.find((a) => a.sys.id === assetId);
            if (!asset) return null;

            return (
              <div className="flex flex-col justify-center items-center">
                <img
                  className="mt-0 mb-2"
                  src={asset.url}
                  alt={asset.description}
                />
                <div>{asset.title}</div>
              </div>
            );
          },
        },
      })}
    </div>
  );
}
