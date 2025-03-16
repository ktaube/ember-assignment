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

// Sample address data
const addresses = [
  {
    id: 1,
    street: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
  },
  {
    id: 2,
    street: "1 Infinite Loop",
    city: "Cupertino",
    state: "CA",
    postalCode: "95014",
    country: "United States",
  },
  {
    id: 3,
    street: "221B Baker St",
    city: "London",
    state: "",
    postalCode: "NW1 6XE",
    country: "United Kingdom",
  },
  {
    id: 4,
    street: "Champs-Élysées",
    city: "Paris",
    state: "",
    postalCode: "75008",
    country: "France",
  },
  {
    id: 5,
    street: "Alexanderplatz 1",
    city: "Berlin",
    state: "",
    postalCode: "10178",
    country: "Germany",
  },
  {
    id: 6,
    street: "Shibuya Crossing",
    city: "Tokyo",
    state: "",
    postalCode: "150-0043",
    country: "Japan",
  },
  {
    id: 7,
    street: "Bondi Beach",
    city: "Sydney",
    state: "NSW",
    postalCode: "2026",
    country: "Australia",
  },
  {
    id: 8,
    street: "Copacabana Beach",
    city: "Rio de Janeiro",
    state: "",
    postalCode: "22070-011",
    country: "Brazil",
  },
  {
    id: 9,
    street: "Taj Mahal Palace",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "India",
  },
  {
    id: 10,
    street: "CN Tower",
    city: "Toronto",
    state: "ON",
    postalCode: "M5V 2T6",
    country: "Canada",
  },
  {
    id: 11,
    street: "Burj Khalifa",
    city: "Dubai",
    state: "",
    postalCode: "",
    country: "United Arab Emirates",
  },
  {
    id: 12,
    street: "Table Mountain",
    city: "Cape Town",
    state: "",
    postalCode: "8001",
    country: "South Africa",
  },
  {
    id: 13,
    street: "Red Square",
    city: "Moscow",
    state: "",
    postalCode: "109012",
    country: "Russia",
  },
  {
    id: 14,
    street: "Great Wall",
    city: "Beijing",
    state: "",
    postalCode: "100000",
    country: "China",
  },
  {
    id: 15,
    street: "Machu Picchu",
    city: "Cusco",
    state: "",
    postalCode: "",
    country: "Peru",
  },
  {
    id: 16,
    street: "Acropolis",
    city: "Athens",
    state: "",
    postalCode: "10558",
    country: "Greece",
  },
  {
    id: 17,
    street: "Colosseum",
    city: "Rome",
    state: "",
    postalCode: "00184",
    country: "Italy",
  },
  {
    id: 18,
    street: "Sagrada Familia",
    city: "Barcelona",
    state: "",
    postalCode: "08013",
    country: "Spain",
  },
  {
    id: 19,
    street: "Pyramids of Giza",
    city: "Cairo",
    state: "",
    postalCode: "",
    country: "Egypt",
  },
  {
    id: 20,
    street: "Petronas Towers",
    city: "Kuala Lumpur",
    state: "",
    postalCode: "50088",
    country: "Malaysia",
  },
  {
    id: 21,
    street: "456 Park Ave",
    city: "Chicago",
    state: "IL",
    postalCode: "60601",
    country: "United States",
  },
  {
    id: 22,
    street: "789 Ocean Blvd",
    city: "Miami",
    state: "FL",
    postalCode: "33139",
    country: "United States",
  },
  {
    id: 23,
    street: "101 Pine St",
    city: "San Francisco",
    state: "CA",
    postalCode: "94111",
    country: "United States",
  },
  {
    id: 24,
    street: "202 Maple Ave",
    city: "Boston",
    state: "MA",
    postalCode: "02108",
    country: "United States",
  },
  {
    id: 25,
    street: "303 Oak Dr",
    city: "Seattle",
    state: "WA",
    postalCode: "98101",
    country: "United States",
  },
];

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
