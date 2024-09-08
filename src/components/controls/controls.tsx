"use client";

import { Separator } from "../ui/separator";
import { ControlsBackground } from "./controls-background";
import { ControlsDarkMode } from "./controls-dark-mode";
import { ControlsDownload } from "./controls-download";
import { ControlsPadding } from "./controls-padding";
import { ControlsTheme } from "./controls-theme";
import { ControlsUrl } from "./controls-url";

export function Controls() {
  return (
    <div className="absolute left-1/2 top-16 flex h-10 -translate-x-1/2 items-center rounded-full border border-primary/15 bg-background px-2 shadow-lg">
      <div className="flex items-center gap-2">
        <ControlsTheme />
        <ControlsBackground />
        <ControlsDarkMode />
      </div>
      <Separator orientation="vertical" className="mx-2 h-5" />
      <ControlsPadding />
      <Separator orientation="vertical" className="mx-2 h-5" />
      <div className="flex items-center gap-1">
        <ControlsUrl />
        <ControlsDownload />
      </div>
    </div>
  );
}
