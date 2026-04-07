export async function getConfig() {
  const fallback = { API_URL: "http://localhost:8080/api" };

  const ensureApiPrefix = (value) => {
    try {
      const url = new URL(value);
      const pathname = url.pathname.replace(/\/+$/, "");
      if (pathname.toLowerCase().endsWith("/api")) {
        return url.toString().replace(/\/+$/, "");
      }
      url.pathname = `${pathname}/api`;
      return url.toString().replace(/\/+$/, "");
    } catch {
      return value;
    }
  };

  const normalizeApiUrl = (value) => {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    if (trimmed.length === 0) return null;
    const normalized = trimmed.replace(/\/+$/, "");
    return ensureApiPrefix(normalized);
  };

  try {
    const envApiUrl =
      typeof import.meta !== "undefined"
        ? normalizeApiUrl(import.meta.env?.VITE_API_URL)
        : null;

    if (envApiUrl) {
      return { API_URL: envApiUrl };
    }

    const config = await import("./vite-config.js").then((mod) => mod.default);
    const configApiUrl = normalizeApiUrl(config?.API_URL);

    if (configApiUrl) {
      return { API_URL: configApiUrl };
    }

    return fallback;
  } catch (err) {
    console.warn("getConfig fallback used:", err.message);
    return fallback;
  }
}
  
