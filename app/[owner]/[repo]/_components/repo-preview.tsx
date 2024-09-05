import Image from "next/image";
import { notFound } from "next/navigation";

import { Preview } from "~/components/preview";
import { contributorSchema } from "~/lib/schema/contributor.schema";
import { repositorySchema } from "~/lib/schema/repository.schema";
import { cn } from "~/lib/utils";
import { RepoPreviewContributors } from "./repo-preview-contributors";
import { RepoPreviewLanguage } from "./repo-preview-language";
import { RepoPreviewStars } from "./repo-preview-stars";

const BASE_URL = "https://api.github.com/repos";

export async function RepoPreview({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const repository = await fetch(`${BASE_URL}/${owner}/${repo}`, {
    next: { revalidate: 600 },
  })
    .then((res) => res.json())
    .then(repositorySchema.parse)
    .catch(() => notFound());

  const contributors = await fetch(repository.contributors_url, {
    next: { revalidate: 1800 },
  })
    .then((res) => res.json())
    .then(contributorSchema.array().parse)
    .catch(() => []);

  return (
    <Preview>
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <Image
            src={repository.owner.avatar_url}
            alt={repository.full_name}
            width={128}
            height={128}
            className={cn(
              "size-6 border",
              repository.owner.type === "User" ? "rounded-full" : "rounded-lg",
            )}
          />

          <span className="font-medium">{repository.full_name}</span>
        </div>

        {repository.description && <p>{repository.description}</p>}

        <div className="flex items-center gap-2.5 text-xs">
          <RepoPreviewLanguage language={repository.language} />
          <span className="text-muted-foreground/25">•</span>
          <RepoPreviewStars count={repository.stargazers_count} />
          <span className="text-muted-foreground/30">•</span>
          <RepoPreviewContributors contributors={contributors} />
        </div>
      </div>
    </Preview>
  );
}
