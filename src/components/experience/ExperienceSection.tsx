import React, { useState } from 'react';
import { BriefcaseIcon, PlusIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { ExperienceEntry, StoredFile } from '../../types/portfolio';
import { compareByDateDesc } from '../../utils/date';
import { createId, deleteFile } from '../../utils/fileStore';
import { FilePreview } from '../ui/FilePreview';
import { Modal } from '../ui/Modal';
import { SectionHeading } from '../ui/SectionHeading';
import { buttonStyles } from '../ui/styles';
import { ExperienceCard } from './ExperienceCard';
import { ExperienceEditor } from './ExperienceEditor';

const emptyEntry = (): ExperienceEntry => ({
  id: createId('exp'),
  role: '',
  organization: '',
  startDate: '',
  endDate: '',
  description: '',
  responsibilities: [],
  accomplishments: [],
  images: []
});

export function ExperienceSection() {
  const { content, update, editMode } = usePortfolio();
  const [editing, setEditing] = useState<{entry: ExperienceEntry;isNew: boolean;} | null>(null);
  const [viewingImage, setViewingImage] = useState<StoredFile | null>(null);
  const entries = [...content.experiences].sort((a, b) => compareByDateDesc(a.startDate, b.startDate));

  const handleSave = (entry: ExperienceEntry) => {
    update((c) => {
      const exists = c.experiences.some((e) => e.id === entry.id);
      return {
        ...c,
        experiences: exists ? c.experiences.map((e) => e.id === entry.id ? entry : e) : [...c.experiences, entry]
      };
    });
    setEditing(null);
  };

  const handleDelete = (entry: ExperienceEntry) => {
    if (!window.confirm('Delete this experience entry?')) return;
    entry.images.forEach((img) => deleteFile(img.id).catch(() => undefined));
    update((c) => ({ ...c, experiences: c.experiences.filter((e) => e.id !== entry.id) }));
  };

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="experience-title"
            eyebrow="~/portfolio/experience"
            title="Experience"
            description="Work, internship, organizational involvement, and multimedia projects." />
          
          {editMode &&
          <button type="button" onClick={() => setEditing({ entry: emptyEntry(), isNew: true })} className={buttonStyles.primary}>
              <PlusIcon className="h-4 w-4" aria-hidden="true" /> Add experience
            </button>
          }
        </div>

        {entries.length ?
        <ol className="relative ml-1.5 mt-14 border-l-2 border-dashed border-line">
            {entries.map((entry) =>
          <ExperienceCard
            key={entry.id}
            entry={entry}
            onEdit={() => setEditing({ entry, isNew: false })}
            onDelete={() => handleDelete(entry)}
            onOpenImage={setViewingImage} />

          )}
          </ol> :

        <div className="mt-16 flex flex-col items-center rounded-3xl border border-dashed border-line bg-canvas px-6 py-16 text-center">
            <BriefcaseIcon className="h-8 w-8 text-clay" aria-hidden="true" />
            <p className="mt-4 text-muted">
              {editMode ? 'Add your first experience entry.' : 'Experience entries will appear here soon.'}
            </p>
          </div>
        }
      </div>

      {editing &&
      <ExperienceEditor
        key={editing.entry.id}
        entry={editing.entry}
        isNew={editing.isNew}
        onCancel={() => setEditing(null)}
        onSave={handleSave} />

      }

      <Modal open={viewingImage !== null} onClose={() => setViewingImage(null)} size="xl" title={viewingImage?.name ?? 'Image'}>
        {viewingImage && <FilePreview file={viewingImage} />}
      </Modal>
    </section>);

}