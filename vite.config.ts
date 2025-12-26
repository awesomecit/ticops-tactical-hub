import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      'react', 
      'react-dom', 
      '@radix-ui/react-tooltip',
      '@radix-ui/react-slot',
      '@radix-ui/react-portal',
      '@radix-ui/react-presence',
    ],
  },
  optimizeDeps: {
    include: ['@ticops/field-mapper'],
    exclude: [],
    force: true,
  },
}));
