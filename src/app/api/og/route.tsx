import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import numeral from "numeral";
import { z } from "zod";

import { THEME_KEYS } from "~/lib/const/theme.const";
import { contributorSchema } from "~/lib/schema/contributor.schema";
import { repositorySchema } from "~/lib/schema/repository.schema";
import { cn, themeBackground } from "~/lib/utils";

const MAX_CONTRIBUTORS = 3;

const BASE_URL = "https://api.github.com/repos";

const searchParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  theme: z.enum(THEME_KEYS).catch("graphite"),
  darkMode: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .catch(true),
});

const COLORS = {
  light: {
    background: "#ffffffbf",
    foreground: "#0a0a0a",
    "muted-foreground": "#737373",
    "img-border": "#e5e5e580",
    "icon-foreground": "#737373a6",
    "separator-foreground": "#73737340",
    "card-border": "#17171740",
  },
  dark: {
    background: "#0a0a0abf",
    foreground: "#fafafa",
    "muted-foreground": "#a3a3a3",
    "card-border": "#fafafa40",
    "img-border": "#26262680",
    "icon-foreground": "#a3a3a3a6",
    "separator-foreground": "#a3a3a34d",
  },
};

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const data = searchParamsSchema.parse({
      owner: searchParams.get("owner"),
      repo: searchParams.get("repo"),
      theme: searchParams.get("theme"),
      darkMode: searchParams.get("darkMode"),
    });

    const { owner, repo, theme, darkMode } = data;

    const colors = darkMode ? COLORS.dark : COLORS.light;

    const repository = await fetch(`${BASE_URL}/${owner}/${repo}`, {
      next: { revalidate: 600 },
    })
      .then((res) => res.json())
      .then(repositorySchema.parse);

    const contributors = await fetch(repository.contributors_url, {
      next: { revalidate: 1800 },
    })
      .then((res) => res.json())
      .then(contributorSchema.array().parse)
      .catch(() => []);

    const users = contributors.filter(
      (contributor) => contributor.type === "User",
    );

    const [interMedium, interSemiBold] = await Promise.all([
      fetch(
        `https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf`,
      ).then((res) => res.arrayBuffer()),
      fetch(
        `https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf`,
      ).then((res) => res.arrayBuffer()),
    ]);

    return new ImageResponse(
      (
        <div
          tw="w-full h-full flex items-center justify-center"
          style={{ padding: 64, ...themeBackground(theme) }}
        >
          <div
            tw="flex flex-col rounded-3xl w-full border-2 shadow-2xl text-[28px] font-medium p-8"
            style={{
              transform: "scale(0.75)",
              background: colors.background,
              color: colors.foreground,
              borderColor: colors["card-border"],
            }}
          >
            <div tw="flex items-center">
              <div tw="flex w-12 h-12 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.full_name}
                  tw={cn(
                    "absolute inset-0",
                    repository.owner.type === "User"
                      ? "rounded-full"
                      : "rounded-2xl",
                  )}
                />
                <div
                  tw={cn(
                    "absolute inset-0 border-2",
                    repository.owner.type === "User"
                      ? "rounded-full"
                      : "rounded-2xl",
                  )}
                  style={{ borderColor: colors["img-border"] }}
                />
              </div>

              <span tw="font-semibold ml-4">{repository.full_name}</span>
            </div>

            {repository.description && (
              <div tw="mt-7" style={{ lineHeight: 1.4 }}>
                {repository.description}
              </div>
            )}

            <div tw="flex items-center text-2xl mt-7">
              {/* Language */}
              {repository.language && (
                <>
                  <div tw="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-code"
                      style={{ color: colors["icon-foreground"] }}
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span tw="ml-3">{repository.language}</span>
                  </div>

                  <span
                    tw="mx-5"
                    style={{ color: colors["separator-foreground"] }}
                  >
                    •
                  </span>
                </>
              )}

              {/* Stars */}
              <div tw="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-star"
                  style={{ color: colors["icon-foreground"] }}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span tw="ml-3">
                  {numeral(repository.stargazers_count).format("0.[0]a")}
                </span>
              </div>

              <span tw="mx-5" style={{ color: colors["separator-foreground"] }}>
                •
              </span>

              {/* Contributors */}
              <div tw="flex items-center">
                {users.slice(0, MAX_CONTRIBUTORS).map((contributor, i) => (
                  <div
                    key={contributor.id}
                    tw="flex w-10 h-10 relative"
                    style={{ marginLeft: i !== 0 ? 8 : 0 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={contributor.id}
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      tw="absolute inset-0 rounded-full"
                    />
                    <div
                      tw="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: colors["img-border"] }}
                    />
                  </div>
                ))}

                {users.length > MAX_CONTRIBUTORS && (
                  <span tw="ml-2" style={{ color: colors["muted-foreground"] }}>
                    +{users.length - MAX_CONTRIBUTORS}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interMedium,
            weight: 500,
          },
          {
            name: "Inter",
            data: interSemiBold,
            weight: 600,
          },
        ],
      },
    );
  } catch (error) {
    return new Response("Failed to generate the image", { status: 500 });
  }
}
