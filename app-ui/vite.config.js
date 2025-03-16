import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: false }),
    viteReact(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/trpc": {
        target: "http://localhost:4201",
        changeOrigin: true,
      },
    },
  },
});
