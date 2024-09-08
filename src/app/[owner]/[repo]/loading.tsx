import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <Loader className="animate-spin text-muted-foreground" />
    </div>
  );
}
