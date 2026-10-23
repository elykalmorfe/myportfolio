import { StoredFile } from '../types/portfolio';

const DB_NAME = 'elyka-portfolio-files';
const STORE_NAME = 'files';
let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE_NAME)) {
          request.result.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function saveFile(file: File): Promise<StoredFile> {
  const db = await openDb();
  const id = createId('file');
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(file, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  return { id, name: file.name, type: file.type || guessType(file.name), size: file.size };
}

export async function loadFile(id: string): Promise<Blob | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result as Blob | undefined ?? null);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteFile(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function downloadBlob(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export async function downloadStoredFile(file: StoredFile): Promise<boolean> {
  const blob = await loadFile(file.id).catch(() => null);
  if (!blob) return false;
  downloadBlob(blob, file.name);
  return true;
}

export const isImageFile = (file: StoredFile) => file.type.startsWith('image/');
export const isPdfFile = (file: StoredFile) =>
file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
export const isVideoFile = (file: StoredFile) =>
file.type.startsWith('video/') || /\.(mp4|webm|m4v|ogg|mov)$/i.test(file.name);

export function fileTypeLabel(file: StoredFile): string {
  if (isPdfFile(file)) return 'PDF';
  if (isImageFile(file)) return 'Image';
  if (isVideoFile(file)) return 'Video';
  const ext = file.name.split('.').pop();
  return ext ? ext.toUpperCase() : 'File';
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function guessType(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (/\.(png|jpe?g|gif|webp|svg)$/.test(lower)) return 'image/*';
  if (lower.endsWith('.webm')) return 'video/webm';
  if (lower.endsWith('.ogg')) return 'video/ogg';
  if (/\.(mp4|m4v|mov)$/.test(lower)) return 'video/mp4';
  return 'application/octet-stream';
}