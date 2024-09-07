"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <h2 className="font-medium">Something went wrong!</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Ups, something went wrong. Please try again.
      </p>
      <div className="mt-6 flex gap-2">
        <Link href="/">
          <Button variant="outline">Return home</Button>
        </Link>
        <Button onClick={reset}>Retry</Button>
      </div>
    </div>
  );
}
