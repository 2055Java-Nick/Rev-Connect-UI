import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // TODO: remove reference to localhost
        target: process.env.API_URL || "http://localhost8080",
        changeOrigin: true,
        secure: false,
        rewrite(path) {
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
});
