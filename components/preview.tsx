"use client";

import { usePreviewStore } from "@/lib/store/preview.store";
import { themeBackground } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function Preview({ children }: PropsWithChildren) {
  const { padding, darkMode, background, theme } = usePreviewStore();

  return (
    <div
      id="preview"
      data-theme={darkMode ? "dark" : "light"}
      className="relative min-w-[600px] max-w-[900px] transition-[padding] duration-200 text-foreground max-sm:scale-[.6]"
      style={{ padding, ...(background ? themeBackground(theme) : {}) }}
    >
      {!background && (
        <div data-ignore-in-export className="transparent-pattern" />
      )}

      <div className="p-4 rounded-xl bg-background/75 border border-primary/25 text-sm shadow-2xl transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
