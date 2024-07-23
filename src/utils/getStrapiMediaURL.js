function getStrapiURL() {
  return import.meta.env.VITE_STRAPI_MUSIC_BASE_URL;
}

export function getStrapiMediaURL(url) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}
