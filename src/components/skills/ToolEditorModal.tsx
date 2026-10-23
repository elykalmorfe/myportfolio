import React, { useRef, useState } from 'react';
import { UploadIcon } from 'lucide-react';
import { StoredFile, ToolItem } from '../../types/portfolio';
import { createId, deleteFile, saveFile } from '../../utils/fileStore';
import { FileInputButton } from '../ui/FileInputButton';
import { Modal } from '../ui/Modal';
import { buttonStyles, inputClass, labelClass } from '../ui/styles';
import { ToolLogo } from './ToolLogo';

interface ToolEditorModalProps {
  tool: ToolItem | null;
  onClose: () => void;
  onSave: (tool: ToolItem) => void;
}

export function ToolEditorModal({ tool, onClose, onSave }: ToolEditorModalProps) {
  const [name, setName] = useState(tool?.name ?? '');
  const [logoUrl, setLogoUrl] = useState(tool?.logoUrl ?? '');
  const [logoFile, setLogoFile] = useState<StoredFile | null>(tool?.logoFile ?? null);
  const [nameError, setNameError] = useState(false);
  const uploaded = useRef<string[]>([]);

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const stored = await saveFile(file);
    uploaded.current.push(stored.id);
    setLogoFile(stored);
  };

  const cleanup = (keepId: string | null) => {
    uploaded.current.filter((id) => id !== keepId).forEach((id) => deleteFile(id).catch(() => undefined));
  };

  const handleCancel = () => {
    cleanup(tool?.logoFile?.id ?? null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    cleanup(logoFile?.id ?? null);
    if (tool?.logoFile && tool.logoFile.id !== logoFile?.id) deleteFile(tool.logoFile.id).catch(() => undefined);
    onSave({ id: tool?.id ?? createId('tool'), name: name.trim(), logoUrl: logoUrl.trim(), logoFile });
  };

  return (
    <Modal open onClose={handleCancel} size="md" title={tool ? `Edit ${tool.name}` : 'Add a tool'}>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="flex items-center gap-4 rounded-2xl bg-canvas p-4">
          <ToolLogo name={name || 'Tool'} logoUrl={logoUrl} logoFile={logoFile} className="h-12 w-12" />
          <p className="text-sm text-muted">Logo preview</p>
        </div>
        <div>
          <label htmlFor="tool-name" className={labelClass}>
            Tool name
          </label>
          <input
            id="tool-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? 'tool-name-error' : undefined} />
          
          {nameError &&
          <p id="tool-name-error" className="mt-1.5 text-xs text-red-700">
              Enter a tool name.
            </p>
          }
        </div>
        <div>
          <label htmlFor="tool-logo-url" className={labelClass}>
            Logo image URL
          </label>
          <input
            id="tool-logo-url"
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://…/logo.svg"
            className={inputClass} />
          
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <FileInputButton accept="image/*" onFiles={handleUpload} className={buttonStyles.small}>
            <UploadIcon className="h-3.5 w-3.5" aria-hidden="true" /> {logoFile ? 'Replace uploaded logo' : 'Or upload a logo'}
          </FileInputButton>
          {logoFile &&
          <button type="button" onClick={() => setLogoFile(null)} className={buttonStyles.smallDanger}>
              Remove upload
            </button>
          }
        </div>
        <div className="flex justify-end gap-2 border-t border-line pt-5">
          <button type="button" onClick={handleCancel} className={buttonStyles.ghost}>
            Cancel
          </button>
          <button type="submit" className={buttonStyles.primary}>
            Save tool
          </button>
        </div>
      </form>
    </Modal>);

}