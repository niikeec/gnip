import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 flex items-center justify-between bg-background px-4 py-2">
      <Link href="/" className="font-medium">
        gnip
      </Link>
      <Link href="https://github.com/niikeec/gnip" target="_blank">
        <GitHubLogoIcon />
      </Link>
    </header>
  );
}
