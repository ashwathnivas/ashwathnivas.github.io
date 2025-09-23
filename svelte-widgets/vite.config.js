import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../assets/widgets',
    emptyOutDir: true,
    lib: {
      entry: './src/Search.svelte',
      name: 'SearchWidget',
      formats: ['es'],
      fileName: () => `Search.js`
    }
  }
});
