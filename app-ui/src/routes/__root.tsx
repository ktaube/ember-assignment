import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import type { AppRouter } from "../../../app-api/src/types";
import { getQueryClient, TRPCProvider } from "../trpc-client";
import Navbar from "./-components/navbar";

export const Route = createRootRoute({
  component: () => {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
      createTRPCClient<AppRouter>({
        links: [
          httpBatchLink({
            url: "/trpc",
          }),
        ],
      })
    );
    return (
      <QueryClientProvider client={queryClient}>
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          <Navbar />
          <Outlet />
        </TRPCProvider>
      </QueryClientProvider>
    );
  },
});
