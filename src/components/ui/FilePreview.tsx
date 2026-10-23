import React, { useState } from 'react';
import { DownloadIcon, ExternalLinkIcon, FileIcon, Trash2Icon } from 'lucide-react';
import { useFileUrl } from '../../hooks/useFileUrl';
import { StoredFile } from '../../types/portfolio';
import { downloadStoredFile, fileTypeLabel, formatBytes, isImageFile, isPdfFile, isVideoFile } from '../../utils/fileStore';
import { buttonStyles } from './styles';

interface FilePreviewProps {
  file: StoredFile;
  onRemove?: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const { url, status } = useFileUrl(file);
  const [downloadFailed, setDownloadFailed] = useState(false);
  const kind = isImageFile(file) ? 'image' : isPdfFile(file) ? 'pdf' : isVideoFile(file) ? 'video' : 'other';

  const handleDownload = async () => {
    const ok = await downloadStoredFile(file);
    setDownloadFailed(!ok);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex min-h-[16rem] items-center justify-center bg-sand/50">
        {status === 'loading' && <div className="h-72 w-full animate-pulse bg-sand" aria-label="Loading preview" />}
        {status === 'missing' &&
        <p className="max-w-sm p-8 text-center text-sm text-muted">
            This file isn't available in this browser. Uploads are stored on the device they were added from.
          </p>
        }
        {status === 'ready' && url && kind === 'image' &&
        <img src={url} alt={`Preview of ${file.name}`} className="max-h-[60vh] w-full object-contain" />
        }
        {status === 'ready' && url && kind === 'pdf' &&
        <iframe src={url} title={`Preview of ${file.name}`} className="h-[60vh] w-full bg-white" />
        }
        {status === 'ready' && url && kind === 'video' &&
        <video src={url} controls playsInline preload="metadata" className="max-h-[60vh] w-full bg-ink" aria-label={`Preview of ${file.name}`} />
        }
        {status === 'ready' && kind === 'other' &&
        <div className="flex flex-col items-center gap-3 p-8 text-center text-sm text-muted">
            <FileIcon className="h-10 w-10 text-clay" aria-hidden="true" />
            Preview isn't available for this file type. Download it to view.
          </div>
        }
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{file.name}</p>
          <p className="text-xs text-muted">
            {fileTypeLabel(file)} · {formatBytes(file.size)}
          </p>
          {downloadFailed && <p className="text-xs text-red-700">Download failed — file not found in this browser.</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          {url &&
          <a href={url} target="_blank" rel="noopener noreferrer" className={buttonStyles.small}>
              <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" /> Open
            </a>
          }
          <button type="button" onClick={handleDownload} className={buttonStyles.small}>
            <DownloadIcon className="h-3.5 w-3.5" aria-hidden="true" /> Download
          </button>
          {onRemove &&
          <button type="button" onClick={onRemove} className={buttonStyles.smallDanger}>
              <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" /> Remove
            </button>
          }
        </div>
      </div>
    </div>);

}