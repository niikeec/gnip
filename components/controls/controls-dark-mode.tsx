"use client";

import { previewStore, usePreviewStore } from "@/lib/store/preview.store";
import { Moon } from "lucide-react";
import { Tooltip } from "../ui/tooltip";
import { ControlsToggle } from "./controls-toggle";

export function ControlsDarkMode() {
  const { darkMode } = usePreviewStore();

  return (
    <Tooltip content="Toggle Dark Mode">
      <div className="size-6">
        <ControlsToggle
          pressed={darkMode}
          onPressedChange={(checked) => {
            previewStore.darkMode = checked;
          }}
        >
          <Moon className="size-4" />
        </ControlsToggle>
      </div>
    </Tooltip>
  );
}
