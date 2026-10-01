// Round neumorphic button that cycles the colour theme.
// Cycles system -> light -> dark and slides the matching icon into view.
import clsx from "clsx";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";

type Mode = "system" | "light" | "dark";

const NEXT: Record<Mode, Mode> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const LABEL: Record<Mode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const STORAGE_KEY = "theme";

const readStoredMode = (): Mode | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : null;
  } catch {
    return null;
  }
};

type Props = { className?: string };

export const LightDarkToggle: FC<Props> = ({ className }) => {
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    const stored = readStoredMode();
    if (stored) setMode(stored);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = mode === "dark" || (mode === "system" && query.matches);
      document.documentElement.classList.toggle("dark", dark);
    };

    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [mode]);

  const label = `Theme: ${LABEL[mode]} (click for ${LABEL[NEXT[mode]]})`;

  return (
    <button
      type="button"
      onClick={() => {
        const next = NEXT[mode];
        setMode(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // A blocked storage API just means the choice is not remembered.
        }
      }}
      aria-label={label}
      title={label}
      className={clsx(
        className,
        "relative h-10 w-10 shrink-0 overflow-hidden rounded-full",
        "bg-[var(--tile-bg)] text-ink-1",
        "[box-shadow:var(--neu-shadow-up)] active:[box-shadow:var(--neu-shadow-in)]",
        "transition-colors hover:text-amber"
      )}
    >
      <Icon mode={mode} active="dark" offset="-translate-y-[30px]">
        <MoonIcon size={20} />
      </Icon>
      <Icon mode={mode} active="system" offset="translate-y-[30px]">
        <SunMoonIcon size={20} />
      </Icon>
      <Icon mode={mode} active="light" offset="translate-y-[30px]">
        <SunIcon size={20} />
      </Icon>
    </button>
  );
};

const Icon: FC<{
  mode: Mode;
  active: Mode;
  offset: string;
  children: ReactNode;
}> = ({ mode, active, offset, children }) => (
  <span
    className={clsx(
      "absolute left-[10px] top-[10px] block h-5 w-5",
      "transition-[transform,opacity] duration-500 ease-in-out",
      mode === active ? "translate-y-0 opacity-100" : `${offset} opacity-0`
    )}
  >
    {children}
  </span>
);
