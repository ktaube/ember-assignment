import { createFileRoute } from "@tanstack/react-router";
import AddressTable, {
  addressSearchSchema,
  type AddressSearchParams,
} from "./-components/address-table";
import { useCallback } from "react";

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: (search) => addressSearchSchema.parse(search),
});

function App() {
  const params = Route.useSearch();
  const navigate = Route.useNavigate();

  const onParamsUpdate = useCallback(
    (params: AddressSearchParams) => {
      navigate({
        search: params,
      });
    },
    [navigate]
  );

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
          <AddressTable params={params} onParamsUpdate={onParamsUpdate} />
        </div>
      </div>
    </>
  );
}
