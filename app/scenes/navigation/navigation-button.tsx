// One label in the navigation rail. The moving pill behind it is drawn by the rail.
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { forwardRef } from "react";

type Props = { to: string; name: string; isCurrent: boolean };

export const NavigationButton = forwardRef<HTMLAnchorElement, Props>(
  ({ to, name, isCurrent }, ref) => (
    <Link
      ref={ref}
      to={to}
      aria-current={isCurrent ? "page" : undefined}
      className={clsx(
        "relative z-10 select-none whitespace-nowrap rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-indigo",
        isCurrent
          ? "text-indigo dark:text-white"
          : "text-ink-3 hover:text-ink-2 dark:text-ink-2 dark:hover:text-ink-1"
      )}
    >
      {name}
    </Link>
  )
);
NavigationButton.displayName = "NavigationButton";
