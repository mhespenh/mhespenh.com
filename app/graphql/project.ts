import request, { gql } from "graphql-request";

export type Project = {
  title: string;
  githubLink: string;
  description: string;
  slug: string;
  headerImage: {
    description: string | null;
    title: string;
    url: string;
  };
  body: {
    json: any;
  };
  contentfulMetadata: {
    tags: {
      id: string;
      name: string;
    }[];
  };
  sys: {
    id: string;
    publishedAt: string;
    firstPublishedAt: string;
    publishedVersion: string;
  };
};

type ProjectCollection = {
  projectCollection: { items: Project[] };
  items: number;
};

export const getProjectBySlug = async (slug: string) => {
  const query = gql`
    query ProjectBySlug($slug: String!) {
      projectCollection(limit: 1, where: { slug: $slug }) {
        items {
          title
          description
          slug
          githubLink
          headerImage {
            description
            title
            url
          }
          body {
            json
          }
          contentfulMetadata {
            tags {
              id
              name
            }
          }
          sys {
            id
            publishedAt
            firstPublishedAt
            publishedVersion
          }
        }
      }
    }
  `;

  const res = await request<ProjectCollection>(
    process.env.CONTENTFUL_GRAPHQL_ENDPOINT!,
    query,
    { slug },
    {
      Authorization: `Bearer ${process.env.CONTENTFUL_API_TOKEN}`,
    }
  );

  return res.projectCollection.items[0];
};
