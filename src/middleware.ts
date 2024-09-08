import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.searchParams.get("redirect") === "true") {
    const parts = request.nextUrl.pathname.split("/").slice(1);
    if (parts.length === 2) {
      const [owner, repo] = parts;
      return NextResponse.redirect(`https://github.com/${owner}/${repo}`, 308);
    }
  }

  return NextResponse.next();
}
