export function htmlToText(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

export function getFakeViewCount(seed: string) {
  const hash = Array.from(seed).reduce((total, char) => total + char.charCodeAt(0) * 31, 0);
  return 80_000 + (hash % 4_900_000);
}
