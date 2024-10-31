"use client";

import { PropsWithChildren } from "react";

import { useControls } from "~/lib/params/controls.params";
import { useIsSafari } from "~/lib/use-is-safari";
import { cn, themeBackground } from "~/lib/utils";

export function Preview({ children }: PropsWithChildren) {
  const [{ theme, padding, darkMode, showBackground }] = useControls();

  const isSafari = useIsSafari();

  return (
    <div className="max-sm:scale-[.6]">
      <div
        id="preview"
        data-theme={darkMode ? "dark" : "light"}
        className="relative min-w-[600px] max-w-[900px] text-foreground transition-[padding] duration-200"
        style={{ padding, ...(showBackground ? themeBackground(theme) : {}) }}
      >
        {!showBackground && (
          <div data-ignore-in-export className="transparent-pattern" />
        )}

        <div
          className={cn(
            "relative min-w-[500px] rounded-xl border border-primary/25 bg-background/75 p-4 text-sm transition-all duration-300",
            !isSafari && showBackground && "shadow-2xl",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
