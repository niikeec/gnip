"use client";

import { Star } from "lucide-react";
import numeral from "numeral";

export function RepoPreviewStars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Star size={16} className="text-muted-foreground/65" />
      {numeral(count).format("0.[0]a")}
    </div>
  );
}
