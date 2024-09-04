import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "~/components/ui/badge";

const SUGGESTIONS = ["raycast/ray-so", "midday-ai/v1", "47ng/nuqs"];

export function SuggestedRepos() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {SUGGESTIONS.map((suggestion) => (
        <Link key={suggestion} href={suggestion}>
          <Badge
            variant="outline"
            className="gap-1 rounded-full bg-secondary/20 py-1 pr-2 hover:bg-secondary/50"
          >
            {suggestion}
            <ArrowUpRight size={13} />
          </Badge>
        </Link>
      ))}
    </div>
  );
}
