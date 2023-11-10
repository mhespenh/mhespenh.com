import type { MetaFunction } from "@remix-run/node";
import { Github, Linkedin, Twitter } from "lucide-react";
import type { FC, ReactNode } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | Contact" }];
};

const Link: FC<{ href: string; name: string; children: ReactNode }> = ({
  href,
  name,
  children,
}) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className="
      group
      flex items-center gap-2 p-3 w-full md:w-fit
      hover:text-primary transition-all 
      no-underline
      border border-black/10 dark:border-white/10 rounded-lg hover:border-primary/50 hover:dark:border-primary/60
      bg-card/10 dark:bg-white/10 backdrop-blur-lg hover:dark:bg-white/5 hover:bg-card/10
    "
  >
    {children}
    <div className="">{name}</div>
  </a>
);

export default function Contact() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Find me around the web...</h1>
      <div className="flex flex-col md:flex-row gap-3">
        <Link href="https://github.com/mhespenh" name="github.com/mhespenh">
          <Github className="group-hover:animate-tilt" />
        </Link>
        <Link
          href="https://linkedin.com/in/mhespenh"
          name="linkedin.com/in/mhespenh"
        >
          <Linkedin className="group-hover:animate-tilt" />
        </Link>
        <Link href="https://twitter.com/mhespenh" name="twitter.com/mhespenh">
          <Twitter className="group-hover:animate-tilt" />
        </Link>
      </div>
    </div>
  );
}
