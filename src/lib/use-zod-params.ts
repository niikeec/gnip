import { useParams } from "next/navigation";
import { z } from "zod";

export const useZodParams = <T extends z.ZodRawShape>(schema: T) => {
  const params = useParams();
  return z.object(schema).parse(params);
};
