import { Link } from "@remix-run/react";
import { useEffect, useRef, type FC } from "react";
import { LightDarkToggle } from "~/components/dark-mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { NavigationButton } from "./navigation-button";

export const Navigation: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 16) {
        ref.current?.classList.add("shadow-md");
        ref.current?.classList.remove("shadow-none");
      } else {
        ref.current?.classList.add("shadow-none");
        ref.current?.classList.remove("shadow-md");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="
        shadow-none transition-shadow
        fixed left-[50%] translate-x-[-50%] p-2
        top-0 sm:top-4
        rounded-none sm:rounded-full
        flex gap-2 justify-between
        w-full max-w-3xl
        z-10
        border border-primary/10
        bg-card/10 dark:bg-white/10 backdrop-blur-lg
      "
    >
      <Avatar className="mr-10">
        <AvatarImage src="apple-touch-icon.png" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <div className="block sm:hidden float-left">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="overflow-x-scroll">
            <DropdownMenuItem>
              <Link to="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/about">About</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/projects">Projects</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/blog">Blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/contact">Contact</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="gap-2 hidden sm:flex">
        <NavigationButton to="/" name="Home" />
        <NavigationButton to="/about" name="About" />
        <NavigationButton to="/projects" name="Projects" />
        <NavigationButton to="/blog" name="Blog" />
        <NavigationButton to="/contact" name="Contact" />
      </div>
      <LightDarkToggle className="ml-10" />
    </div>
  );
};
