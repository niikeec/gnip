"use client";

import { ToggleProps } from "@radix-ui/react-toggle";

import { cn } from "~/lib/utils";
import { Toggle } from "../ui/toggle";

export function ControlsToggle({ children, className, ...props }: ToggleProps) {
  return (
    <Toggle
      {...props}
      className={cn(
        "relative size-6 shrink-0 p-0",
        "data-[state=on]:after:absolute data-[state=on]:after:-bottom-[3px] data-[state=on]:after:left-1/2 data-[state=on]:after:size-1 data-[state=on]:after:-translate-x-1/2 data-[state=on]:after:rounded-full data-[state=on]:after:bg-primary/20 data-[state=on]:after:content-['']",
        className,
      )}
    >
      {children}
    </Toggle>
  );
}
