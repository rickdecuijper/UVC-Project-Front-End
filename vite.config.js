import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    host: '0.0.0.0',  // Makes the server accessible from Docker
    port: 4173
  },
  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        name: 'client',
        environment: 'browser',
        browser: {
          enabled: true,
          provider: 'playwright',
          instances: [{ browser: 'chromium' }]
        },
        include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
        exclude: ['src/lib/server/**'],
        setupFiles: ['./vitest-setup-client.js']
      },
      {
        name: 'server',
        environment: 'node',
        include: ['src/**/*.{test,spec}.{js,ts}'],
        exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
      }
    ]
  }
});
