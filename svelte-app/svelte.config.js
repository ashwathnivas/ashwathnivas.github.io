import adapterStatic from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapterStatic({
      pages: '../assets/svelte',    // output path
      assets: '../assets/svelte',   // static assets
      fallback: null
    }),
    paths: {
      base: ''
    }
  }
};
