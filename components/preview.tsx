"use client";

import { PropsWithChildren } from "react";

import { usePreviewStore } from "~/lib/store/preview.store";
import { useIsSafari } from "~/lib/use-is-safari";
import { cn, themeBackground } from "~/lib/utils";

export function Preview({ children }: PropsWithChildren) {
  const { padding, darkMode, background, theme } = usePreviewStore();

  const isSafari = useIsSafari();

  return (
    <div className="max-sm:scale-[.6]">
      <div
        id="preview"
        data-theme={darkMode ? "dark" : "light"}
        className="relative min-w-[600px] max-w-[900px] text-foreground transition-[padding] duration-200"
        style={{ padding, ...(background ? themeBackground(theme) : {}) }}
      >
        {!background && (
          <div data-ignore-in-export className="transparent-pattern" />
        )}

        <div
          className={cn(
            "relative rounded-xl border border-primary/25 bg-background/75 p-4 text-sm transition-all duration-300",
            !isSafari && background && "shadow-2xl",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
