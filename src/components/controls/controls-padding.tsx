"use client";

import { PADDING_OPTIONS } from "~/lib/const/padding.const";
import { useControls } from "~/lib/params/controls.params";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

export function ControlsPadding() {
  const [{ padding: controlsPadding }, setControls] = useControls();

  return (
    <div className="flex gap-2">
      {PADDING_OPTIONS.map((padding) => (
        <Button
          key={padding}
          variant="ghost"
          size="icon"
          className={cn(
            "relative size-6 text-xs",
            padding === controlsPadding
              ? "text-foreground after:absolute after:-bottom-[3px] after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary/20 after:content-['']"
              : null,
          )}
          onClick={() => setControls({ padding })}
        >
          {padding}
        </Button>
      ))}
    </div>
  );
}
