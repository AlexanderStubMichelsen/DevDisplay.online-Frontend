let config;

if (process.env.NODE_ENV === 'test') {
  // ✅ Test mode: define a static config Jest understands
  config = {
    API_URL: 'http://localhost:5019',
  };
} else {
  // ✅ Non-test mode: defer to the Vite version (runtime only)
  config = await import('./vite-config.js').then((mod) => mod.default);
}

export default config;
