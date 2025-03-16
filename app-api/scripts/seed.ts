import casual from "casual";
import { db } from "../src/db";
import { addresses } from "../src/db/schema";

async function main() {
  for (let id = 1; id < 100000; id++) {
    await db.insert(addresses).values({
      id,
      address: casual.address1,
      country: casual.country,
      zip: casual.zip({ digits: 5 }),
    });
  }
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
