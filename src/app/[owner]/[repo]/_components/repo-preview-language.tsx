"use client";

import { Code } from "lucide-react";

export function RepoPreviewLanguage({ language }: { language: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Code size={16} className="text-muted-foreground/65" />
      {language}
    </div>
  );
}
