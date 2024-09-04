interface ThemeRecord {
  id: string;
  name: string;
  background: { from: string; via?: string; to: string };
}

export const THEMES = {
  mono: {
    id: "mono",
    name: "Mono",
    background: {
      from: "#333333",
      to: "#181818",
    },
  },
  sunset: {
    id: "sunset",
    name: "Sunset",
    background: {
      from: "#FFCF73",
      to: "#FF7A2F",
    },
  },
  sand: {
    id: "sand",
    name: "Sand",
    background: {
      from: "#cbcaa5",
      to: "#334d50",
    },
  },
} as const satisfies Record<string, ThemeRecord>;

export type Theme = keyof typeof THEMES;

export const THEME_OPTIONS = Object.values(THEMES);
