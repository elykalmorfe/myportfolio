import React from 'react';
import { PlayCircleIcon } from 'lucide-react';
import { useFileUrl } from '../../hooks/useFileUrl';
import { Achievement, StoredFile } from '../../types/portfolio';
import { isVideoFile } from '../../utils/fileStore';
import { parseVideoUrl } from '../../utils/video';

interface VideoPlayerProps {
  title: string;
  url?: string;
  file?: StoredFile | null;
  className?: string;
}

export function VideoPlayer({ title, url = '', file, className = '' }: VideoPlayerProps) {
  const { url: fileUrl, status } = useFileUrl(file ?? null);
  const embed = parseVideoUrl(url);
  const frameClass = `aspect-video w-full bg-ink ${className}`;

  if (file) {
    if (status === 'loading') {
      return <div className={`${frameClass} animate-pulse`} aria-label="Loading video" />;
    }
    if (status === 'ready' && fileUrl) {
      return (
        <video
          src={fileUrl}
          controls
          playsInline
          preload="metadata"
          className={frameClass}
          aria-label={title}>
          Your browser cannot play this video.
        </video>
      );
    }
    if (status === 'missing') {
      return (
        <p className="rounded-2xl border border-dashed border-line bg-canvas px-5 py-8 text-center text-sm text-muted">
          This video was uploaded on another device, so it is not available here. Paste a YouTube, Vimeo, or Drive link instead.
        </p>
      );
    }
  }

  if (embed?.kind === 'file') {
    return (
      <video src={embed.src} controls playsInline preload="metadata" className={frameClass} aria-label={title}>
        Your browser cannot play this video.
      </video>
    );
  }

  if (embed?.kind === 'iframe') {
    return (
      <iframe
        src={embed.src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={frameClass} />
    );
  }

  return (
    <div className={`flex aspect-video w-full flex-col items-center justify-center gap-2 bg-ink px-6 text-center ${className}`}>
      <PlayCircleIcon className="h-12 w-12 text-white/80" aria-hidden="true" />
      <p className="font-medium text-white">Internship video</p>
      <p className="max-w-sm text-sm text-white/70">
        Paste a YouTube, Vimeo, or Drive link, or upload an MP4 in Edit mode, and it will play here.
      </p>
    </div>
  );
}

export function internshipVideoFile(files: StoredFile[]) {
  return files.find(isVideoFile) ?? null;
}

export function hasInternshipVideo(item: Pick<Achievement, 'videoUrl' | 'files'>) {
  return Boolean(item.videoUrl?.trim() || internshipVideoFile(item.files));
}
