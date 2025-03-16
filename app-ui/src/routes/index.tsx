import { createFileRoute } from "@tanstack/react-router";
import { useTRPC } from "../trpc-client";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const trpc = useTRPC();

  const { data: hello } = useQuery(trpc.hello.queryOptions("Kristaps"));

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Address Directory
            </h1>
            <p className="text-muted-foreground">
              Browse and search through our comprehensive address database.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen text-2xl">
        <header>{hello}</header>
      </div>
    </>
  );
}
