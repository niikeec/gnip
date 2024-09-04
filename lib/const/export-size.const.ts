export const EXPORT_SIZES = [2, 4, 6] as const;

export type ExportSize = (typeof EXPORT_SIZES)[number];
