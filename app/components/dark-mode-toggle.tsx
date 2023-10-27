import clsx from "clsx";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import type { FC } from "react";
import { useState } from "react";

type Props = { className?: string };

export const LightDarkToggle: FC<Props> = ({ className }) => {
  const [mode, setMode] = useState<"light" | "dark" | "system">("system");

  const handleClick = () => {
    if (mode === "system") {
      setMode("light");
      document.body.classList.remove("dark");
    } else if (mode === "light") {
      setMode("dark");
      document.body.classList.add("dark");
    } else {
      setMode("light");
      document.body.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        className,
        "overflow-hidden h-10 w-10 p-4 rounded-full",
        "self-center hover:bg-card-foreground/10 ",
        "active:shadow-inner ",
        "transition-colors",
        "text-primary dark:text-foreground",
        "hover:text-yellow-700 dark:hover:text-yellow-400"
      )}
    >
      <div
        className={clsx(
          "transition-transform",
          "ease-in-out",
          "duration-500",
          "-translate-x-2",
          mode === "dark" ? "-translate-y-2" : "-translate-y-10"
        )}
      >
        <MoonIcon className="text" />
      </div>
      <div
        className={clsx(
          "transition-transform",
          "ease-in-out",
          "duration-500",
          "-translate-x-2",
          mode === "system" ? "-translate-y-8" : "translate-y-8"
        )}
      >
        <SunMoonIcon />
      </div>
      <div
        className={clsx(
          "transition-transform",
          "ease-in-out",
          "duration-500",
          "-translate-x-2",
          mode === "light" ? "-translate-y-14" : "translate-y-2"
        )}
      >
        <SunIcon />
      </div>
      {/* <div>S</div> */}
    </button>
  );
};
