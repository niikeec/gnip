interface ThemeRecord {
  id: string;
  name: string;
  background: { from: string; via?: string; to: string };
}

export const THEMES = {
  graphite: {
    id: "graphite",
    name: "Graphite",
    background: {
      from: "#333333",
      to: "#181818",
    },
  },
  titanium: {
    id: "titanium",
    name: "Titanium",
    background: {
      from: "#f5f5f5",
      to: "#d1d1d1",
    },
  },
  sunrise: {
    id: "sunrise",
    name: "Sunrise",
    background: {
      from: "#FFC837",
      to: "#FF8008",
    },
  },
  sage: {
    id: "sage",
    name: "Sage",
    background: {
      from: "#cbcaa5",
      to: "#334d50",
    },
  },
  sea: {
    id: "sea",
    name: "Sea",
    background: {
      from: "#36D1DC",
      to: "#5B86E5",
    },
  },
} as const satisfies Record<string, ThemeRecord>;

export type Theme = keyof typeof THEMES;

export const THEME_OPTIONS = Object.values(THEMES);

export const THEME_KEYS = Object.keys(THEMES) as [Theme, ...Theme[]];
