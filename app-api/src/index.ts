import fastify from "fastify";
import { AppRouter, appRouter } from "./trpc";
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
const server = fastify({
  logger: true,
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});
(async () => {
  try {
    await server.listen({ port: parseInt(process.env.PORT!) });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
