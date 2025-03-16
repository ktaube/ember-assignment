import { listAddresses } from "../routers/addresses";
import { router } from "./context";

export const appRouter = router({
  addresses: {
    listAddresses,
  },
});

export type AppRouter = typeof appRouter;
