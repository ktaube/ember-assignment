import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouterContext } from "../main";
import Navbar from "./-components/navbar";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  },
});
