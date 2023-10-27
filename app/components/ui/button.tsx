import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  `
    text-primary dark:text-foreground
    transition-all duration-200 ease-in-out
    active:shadow-md hover:shadow-lg
    inline-flex items-center justify-center
    whitespace-nowrap rounded-md text-sm font-medium 
    ring-offset-background
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 dark:bg-primary/70 hover:bg-primary/20 dark:hover:bg-primary/80 active:bg-primary/30 dark:active:bg-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary/30 hover:border-primary/40 text-primary active:bg-primary/5",
        secondary:
          "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 active:bg-secondary/30",
        ghost:
          "hover:bg-primary/5 hover:dark:bg-primary/60 hover:shadow-none active:bg-primary/10 dark:active:bg-primary/80 active:shadow-inner",
        link: "text-primary underline underline-offset-4 hover:shadow-none active:shadow-inner ",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={`${cn(buttonVariants({ variant, size, className }))}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
