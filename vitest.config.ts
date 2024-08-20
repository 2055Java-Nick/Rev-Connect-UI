import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
      globals: true, 
      environment: 'jsdom', 
      setupFiles: './Rev-Connect-UI/src/setupTests.ts',
    },
  });
