import type { Metadata } from "next";

import { Controls } from "~/components/controls/controls";
import { CONTROLS_SEARCH_PARAMS } from "~/lib/params/controls.params";
import { RepoPreview } from "./_components/repo-preview";

type Params = {
  owner: string;
  repo: string;
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const theme = CONTROLS_SEARCH_PARAMS.theme.parseServerSide(
    searchParams.theme,
  );

  const darkMode = CONTROLS_SEARCH_PARAMS.darkMode.parseServerSide(
    searchParams.darkMode,
  );

  return {
    title: `${params.owner}/${params.repo} | gnip`,
    openGraph: {
      title: `gnip - ${params.owner}/${params.repo}`,
      images: [
        `/api/og?owner=${params.owner}&repo=${params.repo}&theme=${theme}&darkMode=${darkMode}`,
      ],
    },
  } satisfies Metadata;
}

export default function Page({ params }: { params: Params }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background">
      <Controls />
      <RepoPreview owner={params.owner} repo={params.repo} />
    </main>
  );
}
