import { proxy, useSnapshot } from "valtio";
import { ExportSize } from "../const/export-size.const";
import { Padding } from "../const/padding.const";
import { Theme } from "../const/theme.const";

export const previewStore = proxy({
  padding: 64 as Padding,
  theme: "mono" as Theme,
  darkMode: true,
  background: true,
  size: 4 as ExportSize,
});

export const usePreviewStore = () => useSnapshot(previewStore);
