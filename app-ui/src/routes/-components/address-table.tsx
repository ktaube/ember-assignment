import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { useTRPC } from "@/trpc-client";
import { useQuery } from "@tanstack/react-query";

export default function AddressTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [visibleColumns, setVisibleColumns] = useState({
    street: true,
    city: true,
    state: true,
    postalCode: true,
    country: true,
  });

  const itemsPerPage = 10;

  const trpc = useTRPC();

  const { data: addresses = [] } = useQuery(
    trpc.addresses.listAddresses.queryOptions()
  );

  // Filter addresses based on search term and country filter
  const filteredAddresses = addresses.filter((address) => {
    const matchesSearch =
      address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.postalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry =
      countryFilter === "all" || address.country === countryFilter;

    return matchesSearch && matchesCountry;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAddresses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAddresses = filteredAddresses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get unique countries for filter dropdown
  const uniqueCountries = [
    "all",
    ...new Set(addresses.map((address) => address.country)),
  ];

  // Handle page changes
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Toggle column visibility
  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column],
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search addresses..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by country" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country === "all" ? "All Countries" : country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={visibleColumns.street}
                onCheckedChange={() => toggleColumn("street")}
              >
                Street
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.city}
                onCheckedChange={() => toggleColumn("city")}
              >
                City
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.state}
                onCheckedChange={() => toggleColumn("state")}
              >
                State/Province
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.postalCode}
                onCheckedChange={() => toggleColumn("postalCode")}
              >
                Postal Code
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.country}
                onCheckedChange={() => toggleColumn("country")}
              >
                Country
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.street && <TableHead>Street</TableHead>}
              {visibleColumns.city && <TableHead>City</TableHead>}
              {visibleColumns.state && <TableHead>State/Province</TableHead>}
              {visibleColumns.postalCode && <TableHead>Postal Code</TableHead>}
              {visibleColumns.country && <TableHead>Country</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAddresses.length > 0 ? (
              paginatedAddresses.map((address) => (
                <TableRow key={address.id}>
                  {visibleColumns.street && (
                    <TableCell>{address.street}</TableCell>
                  )}
                  {visibleColumns.city && <TableCell>{address.city}</TableCell>}
                  {visibleColumns.state && (
                    <TableCell>{address.state || "-"}</TableCell>
                  )}
                  {visibleColumns.postalCode && (
                    <TableCell>{address.postalCode || "-"}</TableCell>
                  )}
                  {visibleColumns.country && (
                    <TableCell>{address.country}</TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Object.values(visibleColumns).filter(Boolean).length}
                  className="text-center py-8"
                >
                  No addresses found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {paginatedAddresses.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredAddresses.length)} of{" "}
          {filteredAddresses.length} addresses
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
