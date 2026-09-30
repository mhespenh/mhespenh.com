// Sticky glass pill holding the avatar, the section rail and the theme dial.
// The fixed scrim above it blurs page content as it scrolls under the pill.
import { Link } from "@remix-run/react";
import { MenuIcon } from "lucide-react";
import { type FC } from "react";
import { LightDarkToggle } from "~/components/dark-mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { NavigationTabs } from "./navigation-tabs";

const SECTIONS = [
  { to: "/", name: "About" },
  { to: "/projects", name: "Projects" },
  { to: "/blog", name: "Blog" },
  { to: "/contact", name: "Contact" },
];

export const Navigation: FC = () => (
  <>
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-[104px]"
      style={{
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        maskImage: "linear-gradient(to bottom, #000 55%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent)",
      }}
    />
    <div className="sticky top-4 z-[2] w-full max-w-3xl">
      <div
        className="flex items-center justify-between gap-4 rounded-full border border-[var(--glass-border)] p-2 [box-shadow:var(--neu-shadow-up)]"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
        }}
      >
        <Link to="/" aria-label="Home" className="rounded-full">
          <Avatar className="[box-shadow:var(--neu-shadow-up)]">
            <AvatarImage src="/apple-touch-icon.png" alt="mhespenh" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </Link>

        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--tile-bg)] text-ink-1 [box-shadow:var(--neu-shadow-up)] active:[box-shadow:var(--neu-shadow-in)]"
            >
              <MenuIcon size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="border-[var(--glass-border)] bg-[var(--glass-bg)] text-ink-2 [box-shadow:var(--neu-shadow-up)] [backdrop-filter:blur(var(--glass-blur))]"
            >
              {SECTIONS.map(({ to, name }) => (
                <DropdownMenuItem key={to} asChild>
                  <Link to={to}>{name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <NavigationTabs sections={SECTIONS} />

        <LightDarkToggle />
      </div>
    </div>
  </>
);
