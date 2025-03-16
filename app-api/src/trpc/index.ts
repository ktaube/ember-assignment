import { deleteAddress, getAddress, listAddresses } from "../routers/addresses";
import { router } from "./context";

export const appRouter = router({
  addresses: {
    listAddresses,
    getAddress,
    deleteAddress,
  },
});

export type AppRouter = typeof appRouter;
