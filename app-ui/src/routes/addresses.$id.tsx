import { createFileRoute } from "@tanstack/react-router";

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
  const { address } = Route.useLoaderData();
  return <div>Hello {address.address}</div>;
}
