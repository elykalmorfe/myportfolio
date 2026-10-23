import React, { useState } from 'react';
import { AwardIcon, FolderIcon, PlusIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { achievementCategories } from '../../data/achievementCategories';
import { Achievement, AchievementCategory } from '../../types/portfolio';
import { compareByDateDesc } from '../../utils/date';
import { createId, deleteFile } from '../../utils/fileStore';
import { Modal } from '../ui/Modal';
import { SectionHeading } from '../ui/SectionHeading';
import { buttonStyles } from '../ui/styles';
import { WindowFrame } from '../ui/WindowFrame';
import { AchievementDetails } from './AchievementDetails';
import { AchievementForm } from './AchievementForm';
import { AchievementTimelineItem } from './AchievementTimelineItem';

type Filter = 'all' | AchievementCategory;

export function AchievementsSection() {
  const { content, update, editMode } = usePortfolio();
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [draftNew, setDraftNew] = useState<Achievement | null>(null);

  const sorted = [...content.achievements].sort((a, b) => compareByDateDesc(a.date, b.date));
  const visible = filter === 'all' ? sorted : sorted.filter((a) => a.category === filter);
  const opened = content.achievements.find((a) => a.id === openId) ?? null;
  const modalItem = draftNew ?? opened;

  const close = () => {
    setOpenId(null);
    setDraftNew(null);
  };

  const startNew = () =>
  setDraftNew({
    id: createId('ach'),
    category: filter === 'all' ? 'recognition' : filter,
    title: '',
    date: '',
    description: '',
    highlights: [],
    files: [],
    videoUrl: ''
  });

  const handleSave = (item: Achievement) => {
    update((c) => {
      const exists = c.achievements.some((a) => a.id === item.id);
      return { ...c, achievements: exists ? c.achievements.map((a) => a.id === item.id ? item : a) : [...c.achievements, item] };
    });
    close();
  };

  const handleDelete = (item: Achievement) => {
    if (!window.confirm(`Delete "${item.title || 'this achievement'}" and its documents?`)) return;
    item.files.forEach((f) => deleteFile(f.id).catch(() => undefined));
    update((c) => ({ ...c, achievements: c.achievements.filter((a) => a.id !== item.id) }));
    close();
  };

  const filters: {id: Filter;label: string;number?: string;count: number;}[] = [
  { id: 'all', label: 'All achievements', count: content.achievements.length },
  ...achievementCategories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    number: cat.number,
    count: content.achievements.filter((a) => a.category === cat.id).length
  }))];

  const activeLabel = filters.find((f) => f.id === filter)?.label ?? 'All achievements';

  return (
    <section id="achievements" aria-labelledby="achievements-title" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="achievements-title"
            eyebrow="~/portfolio/achievements"
            title="Achievements"
            description="Certificates, recognitions, and milestones, newest first. Open any entry to view details and documents." />
          
          {editMode &&
          <button type="button" onClick={startNew} className={buttonStyles.primary}>
              <PlusIcon className="h-4 w-4" aria-hidden="true" /> Add achievement
            </button>
          }
        </div>

        <WindowFrame
          className="mt-12"
          title={`achievements / ${activeLabel.toLowerCase()} — newest first`}
          actions={<span className="font-mono text-xs text-muted">{visible.length} items</span>}
          bodyClassName="grid lg:grid-cols-[240px_1fr]">
          
          <div className="border-b border-line bg-sand/40 p-3 lg:border-b-0 lg:border-r lg:p-4">
            <p className="mb-2 hidden px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted lg:block">Categories</p>
            <div role="group" aria-label="Filter achievements by category" className="flex gap-1 overflow-x-auto lg:flex-col">
              {filters.map((f) => {
                const selected = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(f.id)}
                    className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                    selected ? 'bg-folder text-white' : 'text-ink hover:bg-sand'}`
                    }>
                    
                    <FolderIcon className={`h-4 w-4 shrink-0 ${selected ? 'fill-white/30' : 'fill-folder-light/60 text-folder'}`} aria-hidden="true" />
                    {f.number && <span className={`font-mono text-xs ${selected ? 'text-white' : 'text-muted'}`}>{f.number}</span>}
                    <span className="flex-1">{f.label}</span>
                    <span className={`font-mono text-xs ${selected ? 'text-white' : 'text-muted'}`}>{f.count}</span>
                  </button>);

              })}
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {visible.length ?
            <ol className="relative ml-2 space-y-5 border-l-2 border-dashed border-line">
                {visible.map((item) =>
              <AchievementTimelineItem key={item.id} achievement={item} onOpen={() => setOpenId(item.id)} />
              )}
              </ol> :

            <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-canvas px-6 py-16 text-center">
                <AwardIcon className="h-8 w-8 text-clay" aria-hidden="true" />
                <p className="mt-4 text-muted">
                  {editMode ? 'No certificates in this category yet — add one above.' : 'No certificates in this category yet.'}
                </p>
              </div>
            }
          </div>
        </WindowFrame>
      </div>

      <Modal
        open={modalItem !== null}
        onClose={close}
        size="xl"
        title={draftNew ? 'Add achievement' : modalItem?.title || 'Achievement'}
        description={editMode && !draftNew ? 'Edit details and manage documents.' : undefined}>
        
        {modalItem && (
        editMode ?
        <AchievementForm
          key={modalItem.id}
          initial={modalItem}
          isNew={draftNew !== null}
          onCancel={close}
          onSave={handleSave}
          onDelete={draftNew ? undefined : () => handleDelete(modalItem)} /> :


        <AchievementDetails achievement={modalItem} />)
        }
      </Modal>
    </section>);

}