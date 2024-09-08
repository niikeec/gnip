import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Loader } from "lucide-react";
import { createSearchParamsCache, parseAsBoolean } from "nuqs/server";

import { Controls } from "~/components/controls/controls";
import { Header } from "~/components/header";
import { CONTROLS_SEARCH_PARAMS } from "~/lib/params/controls.params";
import { RepoPreview } from "./_components/repo-preview";

type Params = { owner: string; repo: string };

type SearchParams = Record<string, string | string[] | undefined>;

const searchParamsCache = createSearchParamsCache({
  redirect: parseAsBoolean.withDefault(false),
});

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
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

export default function Page({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { redirect: shouldRedirect } = searchParamsCache.parse(searchParams);

  if (shouldRedirect) {
    redirect(`https://github.com/${params.owner}/${params.repo}`);
  }

  return (
    <>
      <Header />
      <main className="flex min-h-dvh items-center justify-center">
        <Suspense
          fallback={<Loader className="animate-spin text-muted-foreground" />}
        >
          <Controls />
          <RepoPreview owner={params.owner} repo={params.repo} />
        </Suspense>
      </main>
    </>
  );
}
