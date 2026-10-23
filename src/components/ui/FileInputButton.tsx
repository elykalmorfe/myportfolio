import React, { useRef, useState } from 'react';
import { Loader2Icon } from 'lucide-react';

interface FileInputButtonProps {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export function FileInputButton({ accept, multiple = false, onFiles, children, className = '' }: FileInputButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (!list.length) return;
    setBusy(true);
    setError(false);
    try {
      await onFiles(list);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleChange} />
      
      <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className={className}>
        {busy ?
        <>
            <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" /> Uploading…
          </> :

        children
        }
      </button>
      {error &&
      <span role="alert" className="text-xs text-red-700">
          Upload failed — browser storage may be full.
        </span>
      }
    </>);

}