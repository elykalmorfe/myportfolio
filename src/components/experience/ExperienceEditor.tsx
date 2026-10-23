import React, { useState } from 'react';
import { ImagePlusIcon } from 'lucide-react';
import { useDraftFiles } from '../../hooks/useDraftFiles';
import { ExperienceEntry } from '../../types/portfolio';
import { linesToList } from '../../utils/date';
import { optimizeImage } from '../../utils/image';
import { FileInputButton } from '../ui/FileInputButton';
import { Modal } from '../ui/Modal';
import { MonthYearInput } from '../ui/MonthYearInput';
import { StoredFileThumb } from '../ui/StoredFileThumb';
import { buttonStyles, inputClass, labelClass } from '../ui/styles';

interface ExperienceEditorProps {
  entry: ExperienceEntry;
  isNew: boolean;
  onCancel: () => void;
  onSave: (entry: ExperienceEntry) => void;
}

export function ExperienceEditor({ entry, isNew, onCancel, onSave }: ExperienceEditorProps) {
  const [role, setRole] = useState(entry.role);
  const [organization, setOrganization] = useState(entry.organization);
  const [startDate, setStartDate] = useState(entry.startDate);
  const [endDate, setEndDate] = useState(entry.endDate);
  const [description, setDescription] = useState(entry.description);
  const [responsibilities, setResponsibilities] = useState(entry.responsibilities.join('\n'));
  const [accomplishments, setAccomplishments] = useState(entry.accomplishments.join('\n'));
  const { files, addFiles, removeFile, commit } = useDraftFiles(entry.images);

  const dateError = startDate && endDate && endDate < startDate ? 'End date must be after the start date.' : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateError) return;
    commit();
    onSave({
      ...entry,
      role: role.trim(),
      organization: organization.trim(),
      startDate,
      endDate,
      description: description.trim(),
      responsibilities: linesToList(responsibilities),
      accomplishments: linesToList(accomplishments),
      images: files
    });
  };

  return (
    <Modal open onClose={onCancel} size="lg" title={isNew ? 'Add experience' : 'Edit experience'}>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="exp-role" className={labelClass}>Position or role</label>
            <input id="exp-role" value={role} onChange={(e) => setRole(e.target.value)} className={inputClass} placeholder="e.g. Multimedia Intern" />
          </div>
          <div>
            <label htmlFor="exp-org" className={labelClass}>Organization or company</label>
            <input id="exp-org" value={organization} onChange={(e) => setOrganization(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="exp-start" className={labelClass}>Start date</label>
            <MonthYearInput id="exp-start" value={startDate} onChange={setStartDate} />
          </div>
          <div>
            <label htmlFor="exp-end" className={labelClass}>End date</label>
            <MonthYearInput
              id="exp-end"
              value={endDate}
              onChange={setEndDate}
              aria-describedby="exp-end-help"
              aria-invalid={dateError ? true : undefined} />
            
            <p id="exp-end-help" className={`mt-1.5 text-xs ${dateError ? 'text-red-700' : 'text-muted'}`}>
              {dateError ?? 'Leave blank if ongoing — it will show as "Present".'}
            </p>
          </div>
        </div>
        <div>
          <label htmlFor="exp-desc" className={labelClass}>Brief description</label>
          <textarea id="exp-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="exp-resp" className={labelClass}>Key responsibilities</label>
            <textarea id="exp-resp" rows={5} value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} className={inputClass} placeholder="One per line" />
          </div>
          <div>
            <label htmlFor="exp-acc" className={labelClass}>Contributions & accomplishments</label>
            <textarea id="exp-acc" rows={5} value={accomplishments} onChange={(e) => setAccomplishments(e.target.value)} className={inputClass} placeholder="One per line" />
          </div>
        </div>
        <div>
          <p className={labelClass}>Supporting images or documents</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {files.map((file) =>
            <StoredFileThumb key={file.id} file={file} onRemove={() => removeFile(file.id)} />
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <FileInputButton
              accept="image/*,application/pdf,.pdf"
              multiple
              onFiles={(list) => addFiles(list, (f) => optimizeImage(f))}
              className={buttonStyles.small}>
              
              <ImagePlusIcon className="h-3.5 w-3.5" aria-hidden="true" /> Upload files
            </FileInputButton>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-line pt-5">
          <button type="button" onClick={onCancel} className={buttonStyles.ghost}>Cancel</button>
          <button type="submit" className={buttonStyles.primary}>Save entry</button>
        </div>
      </form>
    </Modal>);

}