import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { useState } from "react";
import { DeleteDialog } from "./-components/delete-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc-client";

export const Route = createFileRoute("/addresses/$id")({
  component: View,
  loader: async ({ params, context: { trpc } }) => {
    const address = await trpc.addresses.getAddress.query({
      id: Number(params.id),
    });
    return { address };
  },
});

function View() {
  const router = useRouter();
  const { address } = Route.useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const onBack = () => {
    queryClient.invalidateQueries({
      queryKey: trpc.addresses.listAddresses.queryKey(),
    });
    if (window.history.state && window.history.state.idx > 0) {
      router.history.back();
    } else {
      router.navigate({ to: "/" });
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Address List
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
            Address Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Id</h3>
              <pre className="text-lg">{address.id}</pre>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Address
              </h3>
              <p className="text-lg">{address.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Country
              </h3>
              <p className="text-lg">{address.country}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Postal Code
              </h3>
              <p className="text-lg">{address.zip}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="destructive" onClick={() => setIsOpen(true)}>
            Delete Address
          </Button>
          <DeleteDialog
            id={isOpen ? address.id : null}
            onClose={onClose}
            onDelete={onBack}
            title="Delete Address"
            description="Are you sure you want to delete this address?"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
