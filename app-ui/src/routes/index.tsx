import { createFileRoute } from "@tanstack/react-router";
import { useTRPC } from "../trpc-client";
import { useQuery } from "@tanstack/react-query";
import AddressTable from "./-components/address-table";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
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
          <AddressTable />
        </div>
      </div>
    </>
  );
}
