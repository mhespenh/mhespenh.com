// The accounts linked from the About and Contact pages.
// Shared so both pages stay in step.
import { Github, Linkedin } from "lucide-react";
import { BlueskyIcon } from "~/components/bluesky-icon";

export const socialLinks = [
  {
    name: "GitHub",
    handle: "github.com/mhespenh",
    href: "https://github.com/mhespenh",
    Icon: Github,
  },
  {
    name: "LinkedIn",
    handle: "linkedin.com/in/mhespenh",
    href: "https://linkedin.com/in/mhespenh",
    Icon: Linkedin,
  },
  {
    name: "Bluesky",
    handle: "@mhespenh.com",
    href: "https://bsky.app/profile/mhespenh.com",
    Icon: BlueskyIcon,
  },
];
