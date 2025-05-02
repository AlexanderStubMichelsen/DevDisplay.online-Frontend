export async function getConfig() {
    const fallback = { API_URL: 'http://localhost:5019' }; // 👈 change if needed
  
    try {
      if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) {
        return { API_URL: import.meta.env.VITE_API_URL };
      }
  
      const config = await import('./vite-config.js').then((mod) => mod.default);
      return config || fallback;
    } catch (err) {
      console.warn('⚠️ getConfig fallback used:', err.message);
      return fallback;
    }
  }
  