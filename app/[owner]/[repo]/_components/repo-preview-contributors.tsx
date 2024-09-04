"use client";

import { Contributor } from "@/lib/schema/contributor.schema";
import { Wrench } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

const MAX_CONTRIBUTORS = 3;

export function RepoPreviewContributors({
  contributors,
}: {
  contributors: Contributor[];
}) {
  const users = useMemo(
    () => contributors.filter((contributor) => contributor.type === "User"),
    [contributors],
  );

  return (
    <div className="flex gap-1.5 items-center">
      <Wrench size={16} className="text-muted-foreground/65" />

      <div className="flex items-center gap-1">
        {users.slice(0, MAX_CONTRIBUTORS).map((contributor) => (
          <div
            key={contributor.id}
            className="relative after:absolute after:inset-0 after:rounded-full after:border after:border-border/50"
          >
            <Image
              key={contributor.id}
              src={contributor.avatar_url}
              alt={contributor.login}
              width={128}
              height={128}
              className="rounded-full relative size-5"
              draggable={false}
            />
          </div>
        ))}

        {users.length > MAX_CONTRIBUTORS && (
          <span className="text-muted-foreground">
            +{users.length - MAX_CONTRIBUTORS}
          </span>
        )}
      </div>
    </div>
  );
}
