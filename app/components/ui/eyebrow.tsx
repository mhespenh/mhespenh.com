// Uppercase mono label that introduces a section.
// Sits above headings and card content at caption weight.
import * as React from "react";

import { cn } from "app/lib/utils";

function Eyebrow({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-mono text-[12px] font-medium uppercase tracking-widest text-ink-3",
        className
      )}
      {...props}
    />
  );
}

export { Eyebrow };
