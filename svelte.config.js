import adapter from '@sveltejs/adapter-auto';

const config = {
  kit: {
    adapter: adapter()
    out: 'build'  // outputs to /build
  }
};

export default config;
