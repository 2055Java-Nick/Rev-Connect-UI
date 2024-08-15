import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,  // Enables global variables like `expect`
    environment: 'jsdom',  // Simulates a browser environment in Node.js
  },
});
