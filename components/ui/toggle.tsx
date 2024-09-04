"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground/80 focus-visible:outline-none focus-visible:text-foreground/80 focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-foreground",
  {
    variants: {
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
