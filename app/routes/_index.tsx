import { Link } from "@remix-run/react";
import { Heading } from "~/components/ui/heading";

export default function Index() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[716px] flex flex-col justify-center items-start relative z-10">
        <div className="max-w-4xl relative">
          {/* Subtle decorative element */}
          <div className="absolute -top-12 -left-12 w-24 h-24 border border-border rounded-full blur-sm"></div>
          <Heading>
            <span className="block text-gray-800 dark:text-gray-200">
              Computer nerd extraordinaire.
            </span>
            <span>Software engineer.</span>
            <span className="block text-secondary">
              Maker/breaker of all manner of things.
            </span>
          </Heading>
          <p className="text-lg md:text-xl text-muted-foreground dark:text-[#ccc3d8] max-w-2xl mb-12 leading-relaxed">
            I am a Software Engineer with a passion for{" "}
            <span className="text-primary font-semibold">creating stuff</span>.
            Hardware and software; frontend and backend; wood, metal, and
            plastic. If you can{" "}
            <span className="text-primary font-semibold">make something</span>{" "}
            from it, chances are I'm interested in it.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/projects"
              className="bg-gradient-to-r from-primary to-purple-600 dark:to-[#344768] text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              View Projects
            </Link>
            <Link
              to="/blog"
              className="bg-card/40 backdrop-blur-xl border border-border px-8 py-4 rounded-full text-foreground font-semibold hover:bg-accent/30 transition-all duration-300 flex items-center gap-2"
            >
              Read the Blog
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
        {/* Abstract Hero Graphic (CSS Based) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] hidden lg:block opacity-60">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 border-[1px] border-primary/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute inset-8 border-[1px] border-secondary/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
            <div className="absolute inset-16 border-[1px] border-accent/20 rounded-full animate-[spin_50s_linear_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>
    </>
  );
}
