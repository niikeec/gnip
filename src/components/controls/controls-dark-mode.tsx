"use client";

import { Moon } from "lucide-react";

import { useControls } from "~/lib/params/controls.params";
import { Tooltip } from "../ui/tooltip";
import { ControlsToggle } from "./controls-toggle";

export function ControlsDarkMode() {
  const [{ darkMode }, setControls] = useControls();

  return (
    <Tooltip content="Toggle Dark Mode">
      <div className="size-6">
        <ControlsToggle
          pressed={darkMode}
          onPressedChange={(checked) => setControls({ darkMode: checked })}
        >
          <Moon className="size-4" />
        </ControlsToggle>
      </div>
    </Tooltip>
  );
}
