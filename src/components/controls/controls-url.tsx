"use client";

import { Link } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { useZodParams } from "~/lib/use-zod-params";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";

const paramsSchema = z.object({ owner: z.string(), repo: z.string() });

export function ControlsUrl() {
  const params = useZodParams(paramsSchema.shape);

  function copyRedirectUrl() {
    const url = `${window.location.origin}/${params.owner}/${params.repo}?redirect=true`;
    navigator.clipboard.writeText(url);
    toast.success("Redirect URL copied to clipboard");
  }

  return (
    <Tooltip content="Copy Redirect URL">
      <Button
        size="icon"
        variant="ghost"
        className="size-6 shrink-0"
        onClick={copyRedirectUrl}
      >
        <Link size={15} />
      </Button>
    </Tooltip>
  );
}
