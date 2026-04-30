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
        "relative overflow-hidden h-10 w-10 bg-card/40 backdrop-blur-xl border border-border hover:bg-accent/30 transition-all duration-300 flex items-center justify-center rounded-full text-primary dark:text-[#d2bbff]"
      )}
    >
      <div
        className={clsx(
          "absolute transition-transform ease-in-out duration-500",
          mode === "dark" ? "translate-y-0" : "-translate-y-12"
        )}
      >
        <MoonIcon size={20} />
      </div>
      <div
        className={clsx(
          "absolute transition-transform ease-in-out duration-500",
          mode === "system" ? "translate-y-0" : "translate-y-12"
        )}
      >
        <SunMoonIcon size={20} />
      </div>
      <div
        className={clsx(
          "absolute transition-transform ease-in-out duration-500",
          mode === "light" ? "translate-y-0" : "translate-y-12"
        )}
      >
        <SunIcon size={20} />
      </div>
    </button>
  );
};
