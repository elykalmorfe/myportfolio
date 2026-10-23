import React from 'react';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { ExperienceEntry, StoredFile } from '../../types/portfolio';
import { formatRange } from '../../utils/date';
import { StoredFileThumb } from '../ui/StoredFileThumb';
import { buttonStyles } from '../ui/styles';
import { WindowFrame } from '../ui/WindowFrame';

interface ExperienceCardProps {
  entry: ExperienceEntry;
  onEdit: () => void;
  onDelete: () => void;
  onOpenImage: (file: StoredFile) => void;
}

export function ExperienceCard({ entry, onEdit, onDelete, onOpenImage }: ExperienceCardProps) {
  const { editMode } = usePortfolio();
  const range = formatRange(entry.startDate, entry.endDate);
  const fileName = `${(entry.organization || 'untitled_experience').toLowerCase().replace(/[^a-z0-9]+/g, '_')}.doc`;

  return (
    <li className="relative pb-8 pl-8 last:pb-0 sm:pl-12">
      <span className="absolute -left-[7px] top-4 h-3.5 w-3.5 rounded-full border-2 border-folder bg-canvas" aria-hidden="true" />
      <WindowFrame
        title={fileName}
        actions={<span className={`font-mono text-xs ${range ? 'text-ink' : 'text-muted'}`}>{range || 'dates tbd'}</span>}
        bodyClassName="p-6 sm:p-8">
        
        <article>
          <h3 className={`font-display text-2xl font-bold tracking-tight sm:text-3xl ${entry.role ? 'text-ink' : 'italic text-muted'}`}>
            {entry.role || 'Role or position'}
          </h3>
          <p className={`mt-1 font-medium ${entry.organization ? 'text-clay' : 'italic text-muted'}`}>
            {entry.organization || 'Organization or company'}
            <span className="font-normal text-muted"> · {range || 'Start – end date'}</span>
          </p>

          <p className={`mt-5 max-w-3xl leading-relaxed text-muted ${entry.description ? '' : 'italic'}`}>
            {entry.description || 'Add a brief description of this experience.'}
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <ListBlock title="Key responsibilities" items={entry.responsibilities} placeholder="Add key responsibilities." />
            <ListBlock title="Contributions & accomplishments" items={entry.accomplishments} placeholder="Add contributions or accomplishments." />
          </div>

          {entry.images.length > 0 &&
          <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Supporting files</p>
              <div className="mt-3 grid max-w-xl grid-cols-3 gap-3 sm:grid-cols-4">
                {entry.images.map((img) =>
              <StoredFileThumb key={img.id} file={img} onClick={() => onOpenImage(img)} />
              )}
              </div>
            </div>
          }

          {editMode &&
          <div className="mt-6 flex gap-2 border-t border-line pt-5">
              <button type="button" onClick={onEdit} className={buttonStyles.small}>
                <PencilIcon className="h-3.5 w-3.5" aria-hidden="true" /> Edit entry
              </button>
              <button type="button" onClick={onDelete} className={buttonStyles.smallDanger}>
                <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" /> Delete
              </button>
            </div>
          }
        </article>
      </WindowFrame>
    </li>);

}

function ListBlock({ title, items, placeholder }: {title: string;items: string[];placeholder: string;}) {
  return (
    <div>
      <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{title}</h4>
      {items.length ?
      <ul className="mt-3 space-y-2">
          {items.map((item, i) =>
        <li key={i} className="flex gap-3 leading-relaxed text-ink/85">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-folder" aria-hidden="true" />
              {item}
            </li>
        )}
        </ul> :

      <p className="mt-3 italic text-muted">{placeholder}</p>
      }
    </div>);

}