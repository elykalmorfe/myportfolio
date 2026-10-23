import React, { useState } from 'react';
import { PencilIcon, PlusIcon, XIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { ToolItem } from '../../types/portfolio';
import { deleteFile } from '../../utils/fileStore';
import { WindowFrame } from '../ui/WindowFrame';
import { ToolEditorModal } from './ToolEditorModal';
import { ToolLogo } from './ToolLogo';

export function ToolkitSection() {
  const { content, update, editMode } = usePortfolio();
  const [editing, setEditing] = useState<{tool: ToolItem | null;} | null>(null);

  const handleRemove = (tool: ToolItem) => {
    if (!window.confirm(`Remove ${tool.name} from your toolkit?`)) return;
    if (tool.logoFile) deleteFile(tool.logoFile.id).catch(() => undefined);
    update((c) => ({ ...c, tools: c.tools.filter((t) => t.id !== tool.id) }));
  };

  const handleSave = (tool: ToolItem) => {
    update((c) => {
      const exists = c.tools.some((t) => t.id === tool.id);
      return { ...c, tools: exists ? c.tools.map((t) => t.id === tool.id ? tool : t) : [...c.tools, tool] };
    });
    setEditing(null);
  };

  return (
    <div className="mt-24">
      <div className="grid gap-4 md:grid-cols-[220px_1fr] md:items-end md:gap-10">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">My Toolkit</h3>
        <p className="max-w-2xl font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
          A curated collection of the software, languages, and technologies I use to turn ideas into finished work.
        </p>
      </div>

      <WindowFrame
        className="mt-10"
        title={`my_toolkit — ${content.tools.length} items`}
        bodyClassName="p-3 sm:p-6">
        
        <ul className="grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2 md:grid-cols-5 lg:grid-cols-7">
          {content.tools.map((tool) =>
          <li
            key={tool.id}
            className="group relative flex flex-col items-center gap-2.5 rounded-xl px-2 py-4 transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-sky/60">
            
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-canvas shadow-soft">
                <ToolLogo name={tool.name} logoUrl={tool.logoUrl} logoFile={tool.logoFile} className="h-8 w-8" />
              </span>
              <span className="text-center text-xs font-medium leading-tight text-ink sm:text-[13px]">{tool.name}</span>
              {editMode &&
            <div className="absolute right-1 top-1 flex gap-1">
                  <button
                type="button"
                onClick={() => setEditing({ tool })}
                className="rounded-full bg-surface p-1 text-muted shadow-soft hover:text-ink"
                aria-label={`Edit ${tool.name}`}>
                
                    <PencilIcon className="h-3 w-3" />
                  </button>
                  <button
                type="button"
                onClick={() => handleRemove(tool)}
                className="rounded-full bg-surface p-1 text-muted shadow-soft hover:text-red-700"
                aria-label={`Remove ${tool.name}`}>
                
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
            }
            </li>
          )}
          {editMode &&
          <li>
              <button
              type="button"
              onClick={() => setEditing({ tool: null })}
              className="flex h-full min-h-[7.5rem] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-folder/50 text-sm text-clay transition-colors duration-150 hover:bg-sky/50">
              
                <PlusIcon className="h-5 w-5" aria-hidden="true" /> Add tool
              </button>
            </li>
          }
        </ul>
      </WindowFrame>

      {editing &&
      <ToolEditorModal key={editing.tool?.id ?? 'new'} tool={editing.tool} onClose={() => setEditing(null)} onSave={handleSave} />
      }
    </div>);

}