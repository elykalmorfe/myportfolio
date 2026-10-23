import React, { useState } from 'react';
import { FileTextIcon, ImageIcon, VideoIcon } from 'lucide-react';
import { StoredFile } from '../../types/portfolio';
import { isImageFile, isVideoFile } from '../../utils/fileStore';
import { FilePreview } from './FilePreview';

interface DocumentViewerProps {
  files: StoredFile[];
  onRemove?: (id: string) => void;
}

export function DocumentViewer({ files, onRemove }: DocumentViewerProps) {
  const [index, setIndex] = useState(0);
  if (!files.length) return null;
  const safeIndex = Math.min(index, files.length - 1);
  const current = files[safeIndex];

  return (
    <div className="space-y-3">
      {files.length > 1 &&
      <div role="tablist" aria-label="Documents" className="flex gap-2 overflow-x-auto pb-1">
          {files.map((file, i) => {
          const Icon = isImageFile(file) ? ImageIcon : isVideoFile(file) ? VideoIcon : FileTextIcon;
          const selected = i === safeIndex;
          return (
            <button
              key={file.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setIndex(i)}
              className={`flex max-w-[14rem] shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors duration-150 ${
              selected ? 'border-ink bg-ink text-canvas' : 'border-line bg-surface text-ink hover:bg-sand'}`
              }>
              
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{file.name}</span>
              </button>);

        })}
        </div>
      }
      <FilePreview key={current.id} file={current} onRemove={onRemove ? () => onRemove(current.id) : undefined} />
    </div>);

}