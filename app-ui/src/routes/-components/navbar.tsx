import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            <Link to="/">
              <img
                src="/ember.avif"
                alt="AddressDB"
                className="object-cover  h-10"
              />
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
}
