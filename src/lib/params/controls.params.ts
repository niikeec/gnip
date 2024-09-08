import {
  parseAsBoolean,
  parseAsNumberLiteral,
  parseAsStringLiteral,
  useQueryStates,
  UseQueryStatesKeysMap,
} from "nuqs";

import { EXPORT_SIZES } from "~/lib/const/export-size.const";
import { PADDING_OPTIONS } from "~/lib/const/padding.const";
import { THEME_KEYS } from "~/lib/const/theme.const";

export const CONTROLS_SEARCH_PARAMS = {
  theme: parseAsStringLiteral(THEME_KEYS).withDefault("graphite"),
  background: parseAsBoolean.withDefault(true),
  darkMode: parseAsBoolean.withDefault(true),
  padding: parseAsNumberLiteral(PADDING_OPTIONS).withDefault(64),
  size: parseAsNumberLiteral(EXPORT_SIZES).withDefault(4),
} satisfies UseQueryStatesKeysMap;

export function useControls() {
  return useQueryStates(CONTROLS_SEARCH_PARAMS, { clearOnDefault: true });
}
