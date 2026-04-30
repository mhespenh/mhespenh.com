import type { MetaFunction } from "@remix-run/node";
import { Heading } from "~/components/ui/heading";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | Journal" }];
};

export default function Blog() {
  return (
    <>
      <div className="flex flex-col gap-16">
        {/* Header Section */}
        <header className="flex flex-col items-start max-w-3xl">
          <Heading>Blog</Heading>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Exploring the intersection of high-performance engineering and
            expressive digital design. Thoughts, tutorials, and
            behind-the-scenes insights.
          </p>
        </header>

        <div className="text-foreground text-2xl font-bold py-20">
          Coming soon...
        </div>
      </div>
    </>
  );
}
