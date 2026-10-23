import { useEffect, useRef, useState } from 'react';
import { StoredFile } from '../types/portfolio';
import { deleteFile, saveFile } from '../utils/fileStore';

export function useDraftFiles(initial: StoredFile[]) {
  const [files, setFiles] = useState<StoredFile[]>(initial);
  const added = useRef<string[]>([]);
  const removed = useRef<string[]>([]);
  const committed = useRef(false);

  const addFiles = async (list: File[], transform?: (file: File) => Promise<File>) => {
    const saved = await Promise.all(
      list.map(async (file) => saveFile(transform ? await transform(file) : file))
    );
    added.current.push(...saved.map((f) => f.id));
    setFiles((prev) => [...prev, ...saved]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    removed.current.push(id);
  };

  const commit = () => {
    committed.current = true;
    removed.current.forEach((id) => deleteFile(id).catch(() => undefined));
  };

  useEffect(
    () => () => {
      if (!committed.current) {
        added.current.forEach((id) => deleteFile(id).catch(() => undefined));
      }
    },
    []
  );

  return { files, addFiles, removeFile, commit };
}