"use client";

import { Code } from "lucide-react";

export function RepoPreviewLanguage({ language }: { language: string }) {
  return (
    <div className="flex gap-1.5 items-center">
      <Code size={16} className="text-muted-foreground/65" />
      {language}
    </div>
  );
}
