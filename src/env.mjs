import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: { NEXT_PUBLIC_SENTRY_DSN: z.string() },
  runtimeEnv: { NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
