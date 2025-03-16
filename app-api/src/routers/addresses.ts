import { db } from "../db";
import { publicProcedure } from "../trpc/context";

export const listAddresses = publicProcedure.query(async () => {
  const addresses = await db.query.addresses.findMany();

  return {
    data: addresses,
  };
});
