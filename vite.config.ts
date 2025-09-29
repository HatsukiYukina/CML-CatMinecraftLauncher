import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import electron from "vite-plugin-electron";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    electron({
      entry: "electron/main.ts",
      onstart(options) {
        //开发时自动重启Electron
        options.reload();
      },
      vite: {
        build: {
          target: "node14",
          outDir: "dist-electron",
          assetsDir: ".",
          minify: process.env.NODE_ENV === "production",
          sourcemap: true,
          rollupOptions: {
            external: ["electron"],
            output: {
              format: "cjs",
              entryFileNames: "[name].js",
            },
          },
        },
      },
    }),
    electron({
      entry: "electron/preload.ts",
      onstart(options) {
        options.reload();
      },
      vite: {
        build: {
          target: "node14",
          outDir: "dist-electron",
          assetsDir: ".",
          minify: process.env.NODE_ENV === "production",
          sourcemap: true,
          rollupOptions: {
            external: ["electron"],
            output: {
              format: "cjs",
              entryFileNames: "[name].js",
            },
          },
        },
      },
    }),
  ],
  base: "./",
});
