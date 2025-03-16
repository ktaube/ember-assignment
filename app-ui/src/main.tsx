import { StrictMode, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../app-api/src/types";
import { getQueryClient, TRPCProvider } from "./trpc-client";
import { QueryClientProvider } from "@tanstack/react-query";

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc",
    }),
  ],
});

export type RouterContext = {
  trpc: typeof trpcClient;
};

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    trpc: trpcClient,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPendingMinMs: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App>
        <RouterProvider router={router} />
      </App>
    </StrictMode>
  );
}
