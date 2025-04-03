import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  server: {
    port: 8080,
    open: true,
  },
  base: command === 'build' ? '/optic-illusion/' : '/', // Use '/' for development and subdirectory for production
}));

