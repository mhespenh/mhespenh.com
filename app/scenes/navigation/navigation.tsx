import { Link, useLocation } from "@remix-run/react";
import { MenuIcon } from "lucide-react";
import { type FC } from "react";
import { LightDarkToggle } from "~/components/dark-mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const Navigation: FC = () => {
  const location = useLocation();

  const isCurrent = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return location.pathname === path;
  };

  const getLinkClassName = (path: string) => {
    const active = isCurrent(path);
    return `
      text-sm font-medium tracking-tight px-3 transition-all duration-300 ease-in-out flex items-center h-full border-b-2
      ${
        active
          ? "text-primary border-primary"
          : "text-muted-foreground border-transparent hover:text-primary hover:bg-accent/50"
      }
    `;
  };

  const navLinks = [
    { to: "/", name: "About" },
    { to: "/projects", name: "Projects" },
    { to: "/blog", name: "Blog" },
    { to: "/contact", name: "Contact" },
  ];

  return (
    <nav className="sticky rounded-full top-4 left-4 right-4 z-50 border-b border-border bg-background/60 backdrop-blur-md shadow-xl dark:shadow-purple-500/10 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-16 px-4 md:px-8">
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <MenuIcon size={24} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-background/95 backdrop-blur-xl border-border"
              >
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link
                      to={link.to}
                      className={`w-full ${
                        isCurrent(link.to)
                          ? "text-primary font-bold"
                          : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Avatar className="h-8 w-8 md:h-10 md:w-10 border border-border">
              <AvatarImage src="/apple-touch-icon.png" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <span className="text-lg md:text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold">
              mhespenh.com
            </span>
          </Link>
        </div>

        <div className="hidden md:flex gap-4 items-center h-full">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              className={getLinkClassName(link.to)}
              to={link.to}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LightDarkToggle />
        </div>
      </div>
    </nav>
  );
};
