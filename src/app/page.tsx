import { Header } from "~/components/header";
import { SearchForm } from "./_components/search-form";
import { SuggestedRepos } from "./_components/suggested-repos";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex min-h-dvh flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">gnip</h1>
        <p className="mb-8 mt-3.5 text-sm text-muted-foreground">
          Create snippets for your GitHub repositories.
        </p>
        <SearchForm />
        <SuggestedRepos />
      </main>
    </>
  );
}
