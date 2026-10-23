import { useEffect, useState } from 'react';
import { StoredFile } from '../types/portfolio';
import { loadFile } from '../utils/fileStore';

type Status = 'idle' | 'loading' | 'ready' | 'missing';

export function useFileUrl(file: StoredFile | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const id = file?.id;

  useEffect(() => {
    if (!id) {
      setUrl(null);
      setStatus('idle');
      return;
    }
    if (file?.url) {
      setUrl(file.url);
      setStatus('ready');
      return;
    }
    let active = true;
    let objectUrl: string | null = null;
    setStatus('loading');
    loadFile(id).
    then((blob) => {
      if (!active) return;
      if (!blob) {
        setStatus('missing');
        return;
      }
      objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);
      setStatus('ready');
    }).
    catch(() => active && setStatus('missing'));
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [id, file?.url]);

  return { url, status };
}