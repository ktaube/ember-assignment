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
    <div className="flex flex-col items-center justify-center h-screen text-2xl">
      <header>{hello}</header>
    </div>
  );
}
