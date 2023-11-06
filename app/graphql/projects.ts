import request, { gql } from "graphql-request";
import type { Project } from "./project";

type ProjectCollection = {
  projectCollection: { items: Omit<Project, "githubLink" | "body">[] };
  items: number;
};

export const getProjects = () => {
  const query = gql`
    query ProjectCollection {
      projectCollection {
        total
        items {
          title
          description
          slug
          headerImage {
            description
            title
            url
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

  return request<ProjectCollection>(
    process.env.CONTENTFUL_GRAPHQL_ENDPOINT!,
    query,
    undefined,
    {
      Authorization: `Bearer ${process.env.CONTENTFUL_API_TOKEN}`,
    }
  );
};
