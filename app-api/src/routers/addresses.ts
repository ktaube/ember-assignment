import { z } from "zod";
import { db } from "../db";
import { publicProcedure } from "../trpc/context";
import * as schema from "../db/schema";
import { count, like, or } from "drizzle-orm";

export const listAddresses = publicProcedure
  .input(
    z.object({
      page: z.number().min(1).optional().default(1),
      perPage: z.number().min(1).max(100).optional().default(10),
      search: z.string().trim().optional(),
    })
  )
  .query(async ({ input }) => {
    const { page, perPage, search } = input;

    const { where, limit, offset } = (() => {
      if (!search?.length)
        return {
          where: undefined,
          limit: perPage,
          offset: (page - 1) * perPage,
        };
      return {
        where: or(
          like(schema.addresses.address, `%${search}%`),
          like(schema.addresses.country, `%${search}%`),
          like(schema.addresses.zip, `%${search}%`)
        ),
        limit: perPage,
        offset: 0,
      };
    })();

    const total = await db
      .select({ count: count() })
      .from(schema.addresses)
      .where(where);

    const addresses = await db.query.addresses.findMany({
      where,
      limit,
      offset,
    });

    return {
      data: addresses,
      totalPages: Math.ceil(total[0].count / perPage),
      page,
      perPage,
    };
  });
