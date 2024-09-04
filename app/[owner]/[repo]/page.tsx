import { Controls } from "@/components/controls/controls";
import { RepoPreview } from "./_components/repo-preview";

export default function Page({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  return (
    <main className="flex min-h-dvh items-center bg-background justify-center">
      <Controls />
      <RepoPreview owner={params.owner} repo={params.repo} />
    </main>
  );
}
