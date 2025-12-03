import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter({
      out: 'build',       // optional
      precompress: false,
      envPrefix: 'VITE_'
    }),
    vite: {
      server: {
        host: '0.0.0.0',  // <--- make server accessible outside container
        port: 4173
      }
    }
  }
};
