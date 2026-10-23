export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function getDetectedSiteUrl(): string {
  if (typeof window === 'undefined') return '';
  const { protocol, hostname, origin, pathname } = window.location;
  if (!protocol.startsWith('http')) return '';
  if (['localhost', '127.0.0.1', '0.0.0.0'].includes(hostname)) return '';
  return origin + pathname;
}

export function getResumeShareUrl(portfolioUrl = '', resumeUrl = ''): string {
  const direct = resumeUrl.trim();
  if (direct && isValidUrl(direct)) return direct;

  const base = portfolioUrl.trim();
  if (base && isValidUrl(base)) {
    try {
      const url = new URL(base);
      url.hash = 'resume';
      url.search = '';
      return url.toString();
    } catch {
      /* fall through to the current page */
    }
  }

  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.hash = 'resume';
  url.search = '';
  return url.toString();
}