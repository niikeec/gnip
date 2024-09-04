"use client";

import { Theme, THEME_OPTIONS } from "@/lib/const/theme.const";
import { previewStore, usePreviewStore } from "@/lib/store/preview.store";
import { themeBackground } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Tooltip } from "../ui/tooltip";

export function ControlsTheme() {
  const { theme } = usePreviewStore();

  return (
    <Select
      value={theme}
      onValueChange={(theme) => (previewStore.theme = theme as Theme)}
    >
      <Tooltip content="Theme">
        <SelectTrigger className="border-0 h-auto rounded-full p-0">
          <div className="size-6 rounded-full" style={themeBackground(theme)} />
        </SelectTrigger>
      </Tooltip>
      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
        {THEME_OPTIONS.map((theme) => (
          <SelectItem key={theme.id} value={theme.id}>
            <div className="flex items-center gap-2">
              <div
                className="size-4 rounded-full"
                style={themeBackground(theme.id)}
              />
              {theme.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}