import { useQueryStates, UseQueryStatesKeysMap } from "nuqs";
import {
  parseAsBoolean,
  parseAsNumberLiteral,
  parseAsStringLiteral,
} from "nuqs/server";

import { EXPORT_SIZES } from "~/lib/const/export-size.const";
import { PADDING_OPTIONS } from "~/lib/const/padding.const";
import { THEME_KEYS } from "~/lib/const/theme.const";

export const CONTROLS_SEARCH_PARAMS = {
  theme: parseAsStringLiteral(THEME_KEYS).withDefault("graphite"),
  showBackground: parseAsBoolean.withDefault(true),
  darkMode: parseAsBoolean.withDefault(true),
  padding: parseAsNumberLiteral(PADDING_OPTIONS).withDefault(64),
  exportSize: parseAsNumberLiteral(EXPORT_SIZES).withDefault(6),
} satisfies UseQueryStatesKeysMap;

export function useControls() {
  return useQueryStates(CONTROLS_SEARCH_PARAMS, {
    urlKeys: { showBackground: "background", exportSize: "size" },
  });
}
