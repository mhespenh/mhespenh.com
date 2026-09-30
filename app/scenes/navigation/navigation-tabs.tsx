// The navigation rail: an inset track with a raised pill that slides to the current section.
// The pill is measured from the active tab, so each section keeps its natural width.
import { useLocation } from "@remix-run/react";
import { useCallback, useLayoutEffect, useRef, useState, type FC } from "react";
import { NavigationButton } from "./navigation-button";

type Props = { sections: { to: string; name: string }[] };

export const NavigationTabs: FC<Props> = ({ sections }) => {
  const { pathname } = useLocation();
  const [, root] = pathname.split("/");
  const current = Math.max(
    0,
    sections.findIndex((s) => s.to === `/${root}`)
  );

  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLAnchorElement | null>());
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

  const movePill = useCallback(() => {
    const list = listRef.current;
    const tab = tabRefs.current.get(sections[current]?.to);
    if (!list || !tab) return;

    const listRect = list.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    setPill({
      left: tabRect.left - listRect.left,
      width: tabRect.width,
      ready: true,
    });
  }, [current, sections]);

  useLayoutEffect(() => {
    movePill();
    window.addEventListener("resize", movePill);
    return () => window.removeEventListener("resize", movePill);
  }, [movePill]);

  return (
    <div
      ref={listRef}
      className="relative hidden items-center rounded-full border border-[var(--rail-track-border)] bg-[var(--rail-track-bg)] p-1 [box-shadow:var(--rail-track-shadow)] sm:inline-flex"
    >
      {pill.ready ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 top-1 rounded-full bg-[var(--rail-pill-bg)] transition-all duration-200 ease-in-out [box-shadow:var(--rail-pill-shadow)] motion-reduce:transition-none"
          style={{ left: pill.left, width: pill.width }}
        />
      ) : null}
      {sections.map(({ to, name }, i) => (
        <NavigationButton
          key={to}
          to={to}
          name={name}
          isCurrent={i === current}
          ref={(el) => {
            tabRefs.current.set(to, el);
          }}
        />
      ))}
    </div>
  );
};
