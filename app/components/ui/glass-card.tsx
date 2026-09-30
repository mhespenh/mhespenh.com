// Frosted panel that every distinct region of the site sits inside.
// Depth comes from the two shadow tokens: resting when raised, inset when not.
import * as React from "react";

import { cn } from "app/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  raised?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, raised = true, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("ring-border relative rounded-[18px] p-5", className)}
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        boxShadow: raised ? "var(--neu-shadow-up)" : "var(--neu-shadow-in)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
