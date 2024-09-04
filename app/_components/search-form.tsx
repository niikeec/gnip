"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  useZodForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

const regex = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/;

const schema = z.object({
  url: z.string().url().regex(regex),
});

export function SearchForm() {
  const router = useRouter();

  const form = useZodForm({ schema, defaultValues: { url: "" } });

  const { formState } = form;

  function handleSubmit({ url }: z.infer<typeof schema>) {
    const [owner, repo] = url.split("https://github.com/")[1].split("/");
    router.push(`/${owner}/${repo}`);
  }

  return (
    <Form form={form} onSubmit={handleSubmit} className="relative z-50 w-full">
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem className="relative mx-auto w-full max-w-[310px] space-y-0 md:max-w-[450px]">
            <FormControl>
              <Input
                {...field}
                placeholder="https://github.com/niikeec/gnip"
                className={cn(
                  "h-12 truncate rounded-full border-primary/15 pl-5 pr-28 shadow-lg",
                  formState.errors.url && "!ring-destructive",
                )}
              />
            </FormControl>
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full">
              Search
            </Button>
          </FormItem>
        )}
      />
    </Form>
  );
}
