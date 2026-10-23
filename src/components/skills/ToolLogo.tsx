import React, { useEffect, useState } from 'react';
import { useFileUrl } from '../../hooks/useFileUrl';
import { StoredFile } from '../../types/portfolio';

interface ToolLogoProps {
  name: string;
  logoUrl: string;
  logoFile: StoredFile | null;
  className?: string;
}

export function ToolLogo({ name, logoUrl, logoFile, className = 'h-10 w-10' }: ToolLogoProps) {
  const { url: fileUrl } = useFileUrl(logoFile);
  const src = fileUrl ?? (logoFile ? null : logoUrl || null);
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    const initials = name.
    split(/[\s/]+/).
    filter(Boolean).
    map((w) => w[0]).
    slice(0, 2).
    join('').
    toUpperCase();
    return (
      <span className={`flex items-center justify-center rounded-xl bg-sand font-display text-sm text-clay ${className}`} aria-hidden="true">
        {initials || '?'}
      </span>);

  }

  return <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} className={`object-contain ${className}`} />;
}