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
  <div
    className="
      flex flex-col items-center md:flex-row
      hover:bg-gray-100 dark:hover:bg-gray-700
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-lg shadow hover:shadow-lg
      transition-all 
    "
  >
    <img
      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-64 md:rounded-none md:rounded-l-lg"
      src={headerImage}
      alt={headerAlt}
    />
    <Link
      className="flex flex-col justify-between p-4 leading-normal"
      to={slug}
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight prose dark:prose-invert">
        {title}
      </h5>
      <p className="italic mb-3 ">
        {new Date(publishedAt).toLocaleDateString()}
      </p>
      <p className="font-normal prose dark:prose-invert">{description}</p>
    </Link>
  </div>
);
