import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      pages: '../assets/svelte',   // output HTML/JS/CSS to your repo
      assets: '../assets/svelte',  // static assets
      fallback: null
    }),
    paths: {
      base: ''
    }
  }
};

export default config;
