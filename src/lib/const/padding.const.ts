export const PADDING_OPTIONS = [16, 32, 64, 128] as const;

export type Padding = (typeof PADDING_OPTIONS)[number];
