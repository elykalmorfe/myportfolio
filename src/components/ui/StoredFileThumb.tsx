import React from 'react';
import { FileTextIcon, XIcon } from 'lucide-react';
import { useFileUrl } from '../../hooks/useFileUrl';
import { StoredFile } from '../../types/portfolio';
import { isImageFile } from '../../utils/fileStore';

interface StoredFileThumbProps {
  file: StoredFile;
  onClick?: () => void;
  onRemove?: () => void;
}

export function StoredFileThumb({ file, onClick, onRemove }: StoredFileThumbProps) {
  const { url } = useFileUrl(file);
  const content =
  url && isImageFile(file) ?
  <img src={url} alt={file.name} className="h-full w-full object-cover" /> :

  <span className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center text-[11px] text-muted">
        <FileTextIcon className="h-5 w-5 text-clay" aria-hidden="true" />
        <span className="line-clamp-2 break-all">{file.name}</span>
      </span>;


  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-sand/50">
      {onClick ?
      <button
        type="button"
        onClick={onClick}
        className="block h-full w-full transition-opacity duration-150 hover:opacity-90"
        aria-label={`View ${file.name}`}>
        
          {content}
        </button> :

      content
      }
      {onRemove &&
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1.5 top-1.5 rounded-full bg-surface/95 p-1 text-ink shadow-soft hover:bg-red-50 hover:text-red-700"
        aria-label={`Remove ${file.name}`}>
        
          <XIcon className="h-3.5 w-3.5" />
        </button>
      }
    </div>);

}