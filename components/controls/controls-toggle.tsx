"use client";

import { cn } from "@/lib/utils";
import { ToggleProps } from "@radix-ui/react-toggle";
import { Toggle } from "../ui/toggle";

export function ControlsToggle({ children, className, ...props }: ToggleProps) {
  return (
    <Toggle
      {...props}
      className={cn(
        "size-6 p-0 shrink-0 relative",
        "data-[state=on]:after:content-[''] data-[state=on]:after:absolute data-[state=on]:after:size-1 data-[state=on]:after:-bottom-[3px] data-[state=on]:after:left-1/2 data-[state=on]:after:-translate-x-1/2 data-[state=on]:after:rounded-full data-[state=on]:after:bg-primary/20",
        className,
      )}
    >
      {children}
    </Toggle>
  );
}
