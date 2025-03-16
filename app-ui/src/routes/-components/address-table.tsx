import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableLinkRow,
  TableRow,
} from "@/components/ui/table";
import { useTRPC } from "@/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Link } from "@tanstack/react-router";

export type AddressSearchParams = z.infer<typeof addressSearchSchema>;
export const addressSearchSchema = z.object({
  search: z.string().optional(),
  page: z.number().min(1).optional(),
  perPage: z.number().min(1).max(100).optional(),
});

type Props = {
  params: AddressSearchParams;
  onParamsUpdate: (params: AddressSearchParams) => void;
};

export default function AddressTable({ params, onParamsUpdate }: Props) {
  const trpc = useTRPC();

  const { page = 1, perPage = 100, search } = params;

  const { data } = useQuery(
    trpc.addresses.listAddresses.queryOptions({
      page,
      perPage,
      search,
    })
  );

  const { data: addresses = [], totalPages = 1 } = data ?? {};

  // Handle page changes
  const goToPage = (page: number) => {
    onParamsUpdate({
      ...params,
      page: Math.max(1, Math.min(page, totalPages)),
    });
  };

  const hasSearch = !!params.search?.length;

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search addresses..."
            className="pl-8"
            value={params.search}
            onChange={(e) =>
              onParamsUpdate({
                ...params,
                search: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Address</TableHead>
              <TableHead className="w-[25%]">Country</TableHead>
              <TableHead className="w-[25%]">Postal Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <TableLinkRow
                  to={`/addresses/$id`}
                  params={{ id: address.id.toString() }}
                  key={address.id}
                >
                  <TableCell>{address.address}</TableCell>
                  <TableCell>{address.country}</TableCell>
                  <TableCell>{address.zip}</TableCell>
                </TableLinkRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  No addresses found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!hasSearch ? (
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {addresses.length > 0 ? page * perPage + 1 : 0} to{" "}
            {Math.min(page * perPage + perPage, addresses.length)} of{" "}
            {addresses.length} addresses
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(1)}
              disabled={page === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {page} of {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(totalPages)}
              disabled={page === totalPages || totalPages === 0}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
