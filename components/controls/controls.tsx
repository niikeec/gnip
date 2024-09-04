"use client";

import { Separator } from "../ui/separator";
import { ControlsBackground } from "./controls-background";
import { ControlsDarkMode } from "./controls-dark-mode";
import { ControlsDownload } from "./controls-download";
import { ControlsPadding } from "./controls-padding";
import { ControlsTheme } from "./controls-theme";

export function Controls() {
  return (
    <div className="absolute flex items-center top-12 left-1/2 -translate-x-1/2 rounded-full bg-background border border-primary/15 shadow-lg px-2 h-10">
      <div className="flex gap-2 items-center">
        <ControlsTheme />
        <ControlsBackground />
        <ControlsDarkMode />
      </div>
      <Separator orientation="vertical" className="h-5 mx-2" />
      <ControlsPadding />
      <Separator orientation="vertical" className="h-5 mx-2" />
      <ControlsDownload />
    </div>
  );
}
