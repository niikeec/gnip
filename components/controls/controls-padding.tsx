"use client";

import { PADDING_OPTIONS } from "~/lib/const/padding.const";
import { previewStore, usePreviewStore } from "~/lib/store/preview.store";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

export function ControlsPadding() {
  const snapshot = usePreviewStore();

  return (
    <div className="flex gap-2">
      {PADDING_OPTIONS.map((padding) => (
        <Button
          key={padding}
          variant="ghost"
          size="icon"
          className={cn(
            "relative size-6 text-xs",
            padding === snapshot.padding
              ? "text-foreground after:absolute after:-bottom-[3px] after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary/20 after:content-['']"
              : null,
          )}
          onClick={() => (previewStore.padding = padding)}
        >
          {padding}
        </Button>
      ))}
    </div>
  );
}
