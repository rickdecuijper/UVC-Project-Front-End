import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';
const ghPages = process.env.DEPLOY_TARGET === 'gh-pages';

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'
    }),
    paths: {
      base: dev || !ghPages ? '' : '/UVC-Project-Front-End'
    }
  }
};
