import Link from "next/link";

import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <span className="font-medium">Sorry, that page could not be found.</span>
      <p className="mt-2 text-sm text-muted-foreground">
        The requested page either doesn’t exist or the repository is private.
      </p>
      <Link href="/" className="mt-6">
        <Button>Return home</Button>
      </Link>
    </div>
  );
}
