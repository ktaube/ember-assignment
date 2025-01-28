import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

const main = async () => {
  const prisma = new PrismaClient();
  const server = Fastify({ logger: true });

  server.get("/", async (_request) => {
    const addresses = await prisma.address.findMany();

    return { addresses };
  });

  try {
    await server.listen({
      port: 4001,
    });
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

main();
