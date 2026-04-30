import * as React from "react";

const Heading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={`text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 tracking-tighter ${className}`}
    {...props}
  >
    {props.children}
  </h1>
));

Heading.displayName = "Heading";

export { Heading };
