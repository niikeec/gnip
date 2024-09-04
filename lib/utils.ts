import { CSSProperties } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Theme, THEMES } from "./const/theme.const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function themeBackground(theme: Theme) {
  const { background } = THEMES[theme];

  return {
    backgroundImage: `linear-gradient(140deg, ${background.from}, ${background.to})`,
  } satisfies CSSProperties;
}
