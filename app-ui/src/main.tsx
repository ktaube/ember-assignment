import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, type ReactNode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { QueryClientProvider } from "@tanstack/react-query";
import "./styles.css";
import { getQueryClient, trpcClient, TRPCProvider } from "./trpc-client";

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
