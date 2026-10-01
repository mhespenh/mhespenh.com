// Project detail page: header image, metadata and the Contentful write-up.
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Github } from "lucide-react";
import { Chip } from "~/components/ui/chip";
import { GlassCard } from "~/components/ui/glass-card";
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
    description,
    githubLink,
    headerImage,
    sys: { publishedAt },
    contentfulMetadata: { tags },
    body: { json, links },
  } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-7">
      <Link
        to="/projects"
        className="text-sm font-medium text-indigo hover:text-violet"
      >
        ← All projects
      </Link>

      <div className="flex flex-col gap-4">
        <h1 className="[text-wrap:pretty] font-display text-[clamp(34px,6vw,52px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-1">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[13px] text-ink-3">
            {publishedAt.slice(0, 10)}
          </span>
          {tags.map((t) => (
            <Chip key={t.id}>{t.name}</Chip>
          ))}
          {githubLink ? (
            <a
              href={githubLink}
              rel="noopener noreferrer"
              target="_blank"
              className="ml-auto flex items-center gap-2 rounded-xl bg-[var(--tile-bg)] px-3.5 py-2 text-sm font-medium text-ink-1 [box-shadow:var(--neu-shadow-up)] hover:text-indigo active:[box-shadow:var(--neu-shadow-in)]"
            >
              <Github size={18} />
              View at Github.com
            </a>
          ) : null}
        </div>
      </div>

      <img
        className="aspect-video w-full rounded-[18px] bg-[var(--tile-bg)] object-cover [box-shadow:var(--neu-shadow-up)]"
        src={headerImage.url}
        alt={headerImage.description ?? title}
      />

      <GlassCard>
        <div className="prose max-w-none px-3 py-2 text-[17px] leading-[1.7] prose-headings:font-display prose-code:rounded-md prose-code:bg-[var(--tile-bg)] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:[box-shadow:var(--neu-shadow-in)] prose-code:before:content-none prose-code:after:content-none">
          <p className="text-[19px] text-ink-1">{description}</p>
          {documentToReactComponents(json, {
            renderNode: {
              "embedded-asset-block": (node) => {
                const assetId = node.data.target.sys.id;
                const asset = links.assets.block.find(
                  (a) => a.sys.id === assetId
                );
                if (!asset) return null;

                return (
                  <figure className="flex flex-col items-center gap-2.5">
                    <img
                      className="my-0 w-full rounded-xl object-cover [box-shadow:var(--neu-shadow-in)]"
                      src={asset.url}
                      alt={asset.description}
                    />
                    <figcaption className="text-[13px] text-ink-3">
                      {asset.title}
                    </figcaption>
                  </figure>
                );
              },
            },
          })}
        </div>
      </GlassCard>

      <Link
        to="/projects"
        className="text-sm font-medium text-indigo hover:text-violet"
      >
        ← All projects
      </Link>
    </div>
  );
}
