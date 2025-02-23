"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white p-4 shadow-md text-xl font-semibold">
        What's up Brussels?
      </header>

      <main className="flex h-full flex-col items-center justify-center">
        <h2 className="text-center">Ops! Something went wrong!</h2>
        <Button className="mb-3 mt-5" onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild>
          <a href="/">Go back to home</a>
        </Button>
      </main>
    </div>
  );
}
