"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Global TanStack Query defaults.
 * Individual hooks can override these on a per-query basis.
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 5 minutes globally.
        // Queries with their own staleTime (e.g. venue/event types = 1hr) override this.
        staleTime: 5 * 60 * 1000,
        // Keep unused query data in the cache for 30 minutes before GC.
        gcTime: 30 * 60 * 1000,
        // Don't hammer the server on every tab focus or reconnect.
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // Retry once on failure before surfacing an error UI.
        retry: 1,
      },
    },
  });
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState ensures each browser session gets a single shared QueryClient instance.
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
