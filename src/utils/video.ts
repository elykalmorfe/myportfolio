export type VideoEmbed =
  | { kind: 'iframe'; src: string }
  | { kind: 'file'; src: string };

export function parseVideoUrl(raw: string): VideoEmbed | null {
  const value = raw.trim();
  if (!value) return null;
  if (/^\/[^?#]*\.(mp4|webm|m4v|ogg)(?:[?#]|$)/i.test(value)) {
    return { kind: 'file', src: value };
  }

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.replace(/^\//, '').split('/')[0];
      return id ? { kind: 'iframe', src: `https://www.youtube.com/embed/${id}` } : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      const id = url.searchParams.get('v') || url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];
      return id ? { kind: 'iframe', src: `https://www.youtube.com/embed/${id}` } : null;
    }

    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = url.pathname.split('/').filter(Boolean).pop();
      return id ? { kind: 'iframe', src: `https://player.vimeo.com/video/${id}` } : null;
    }

    if (host === 'drive.google.com') {
      const id = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] || url.searchParams.get('id');
      return id ? { kind: 'iframe', src: `https://drive.google.com/file/d/${id}/preview` } : null;
    }

    if (/\.(mp4|webm|m4v|ogg)(\?|$)/i.test(url.pathname)) {
      return { kind: 'file', src: value };
    }

    return { kind: 'iframe', src: value };
  } catch {
    return null;
  }
}
