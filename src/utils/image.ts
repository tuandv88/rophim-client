const DEFAULT_CDN = "https://img.ophim.live/uploads/movies";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getImageUrl(path: string, cdn = DEFAULT_CDN) {
  if (!path) {
    return "/placeholder-poster.svg";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedCdn = normalizeMovieImageCdn(cdn);
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedCdn}/${normalizedPath}`;
}

function normalizeMovieImageCdn(cdn: string) {
  const normalizedCdn = cdn.endsWith("/") ? cdn.slice(0, -1) : cdn;

  if (normalizedCdn.endsWith("/uploads/movies")) {
    return normalizedCdn;
  }

  return `${normalizedCdn}/uploads/movies`;
}

export function getTmdbImageUrl(path: string, size = "w780") {
  if (!path) {
    return "/placeholder-poster.svg";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
