// Contact page: a card per account, linking out to each profile.
import type { MetaFunction } from "@remix-run/node";
import { Eyebrow } from "~/components/ui/eyebrow";
import { GlassCard } from "~/components/ui/glass-card";
import { socialLinks } from "~/lib/social-links";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | Contact" }];
};

export default function Contact() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="font-display text-[clamp(34px,6vw,52px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-1">
          Find me around the web...
        </h1>
      </div>
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        {socialLinks.map(({ name, handle, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link block text-ink-1 hover:text-indigo"
          >
            <GlassCard className="w-full">
              <div className="flex flex-col gap-5">
                <Icon size={28} strokeWidth={1.8} />
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] text-ink-3">{name}</span>
                  <span className="break-words font-mono text-[13px]">{handle}</span>
                </div>
              </div>
            </GlassCard>
          </a>
        ))}
      </div>
    </div>
  );
}
