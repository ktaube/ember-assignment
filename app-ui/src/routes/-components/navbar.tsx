import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-semibold">AddressDB</span>
        </div>
        <nav className="ml-8">
          <ul className="flex gap-6">
            <li>
              <Link
                to="/"
                className="text-sm font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full"
              >
                Addresses
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
