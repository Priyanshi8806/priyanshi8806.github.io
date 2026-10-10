// Prefixes internal paths with the configured `base`, so links work on both
// `<user>.github.io` and `<user>.github.io/<repo>` deployments.
export function url(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function formatDate(date: Date, style: 'long' | 'month' = 'long'): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'short' : 'long',
    ...(style === 'long' ? { day: 'numeric' } : {}),
    timeZone: 'UTC',
  });
}
