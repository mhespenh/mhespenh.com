// Small pill for tags, filters and status labels, set in the mono face.
// Variants map to the design system's accent colors.
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "app/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[12px] font-medium",
  {
    variants: {
      variant: {
        default:
          "border-[var(--glass-border)] bg-white/30 text-ink-2 dark:bg-white/5",
        active: "border-indigo/30 bg-indigo/[0.15] text-indigo",
        due: "border-rose/30 bg-rose/[0.12] text-rose",
        confirmed: "border-mint/30 bg-mint/[0.12] text-mint",
        estimated: "border-amber/30 bg-amber/[0.12] text-amber",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {}

function Chip({ className, variant, ...props }: ChipProps) {
  return <span className={cn(chipVariants({ variant }), className)} {...props} />;
}

export { Chip, chipVariants };
