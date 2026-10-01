// Blog placeholder until there is something to publish.
import type { MetaFunction } from "@remix-run/node";
import { Chip } from "~/components/ui/chip";
import { Eyebrow } from "~/components/ui/eyebrow";
import { GlassCard } from "~/components/ui/glass-card";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | Blog" }];
};

export default function Blog() {
  return (
    <div className="flex flex-col gap-6">
      <Eyebrow>Blog</Eyebrow>
      <GlassCard>
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 text-center">
          <Chip variant="estimated">in progress</Chip>
          <p className="font-display text-[32px] font-extrabold text-ink-1">
            Coming soon...
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
