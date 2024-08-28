/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },


  server: {
    proxy: {
      "/api": {
        // TODO: remove reference to localhost
        target: process.env.VITE_API_URL || "http://localhost8080",
        changeOrigin: true,
        secure: false,
        rewrite(path) {
          return path.replace(/^\/api/, "/api");
        },
      },
    },
  },
});

