import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const addresses = sqliteTable("addresses", {
  id: int().primaryKey({ autoIncrement: true }),
  address: text().notNull(),
  country: text(),
  zip: text(),
});
