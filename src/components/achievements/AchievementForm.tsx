import React, { useState } from 'react';
import { Trash2Icon, UploadIcon } from 'lucide-react';
import { achievementCategories } from '../../data/achievementCategories';
import { useDraftFiles } from '../../hooks/useDraftFiles';
import { Achievement, AchievementCategory } from '../../types/portfolio';
import { linesToList } from '../../utils/date';
import { isVideoFile } from '../../utils/fileStore';
import { parseVideoUrl } from '../../utils/video';
import { DocumentViewer } from '../ui/DocumentViewer';
import { FileInputButton } from '../ui/FileInputButton';
import { MonthYearInput } from '../ui/MonthYearInput';
import { VideoPlayer, internshipVideoFile } from '../ui/VideoPlayer';
import { buttonStyles, inputClass, labelClass } from '../ui/styles';

interface AchievementFormProps {
  initial: Achievement;
  isNew: boolean;
  onCancel: () => void;
  onSave: (item: Achievement) => void;
  onDelete?: () => void;
}

export function AchievementForm({ initial, isNew, onCancel, onSave, onDelete }: AchievementFormProps) {
  const [category, setCategory] = useState<AchievementCategory>(initial.category);
  const [title, setTitle] = useState(initial.title);
  const [date, setDate] = useState(initial.date);
  const [description, setDescription] = useState(initial.description);
  const [highlights, setHighlights] = useState(initial.highlights.join('\n'));
  const [titleError, setTitleError] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initial.videoUrl ?? '');
  const [videoError, setVideoError] = useState<string | null>(null);
  const { files, addFiles, removeFile, commit } = useDraftFiles(initial.files);
  const videoFile = internshipVideoFile(files);
  const isInternship = category === 'internship';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
      document.getElementById('ach-title')?.focus();
      return;
    }
    const trimmedVideo = videoUrl.trim();
    if (trimmedVideo && !parseVideoUrl(trimmedVideo)) {
      setVideoError('Paste a full YouTube, Vimeo, Google Drive, or direct video URL.');
      document.getElementById('ach-video-url')?.focus();
      return;
    }
    commit();
    onSave({
      ...initial,
      category,
      title: title.trim(),
      date,
      description: description.trim(),
      highlights: linesToList(highlights),
      files,
      videoUrl: trimmedVideo
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ach-category" className={labelClass}>Category</label>
          <select id="ach-category" value={category} onChange={(e) => setCategory(e.target.value as AchievementCategory)} className={inputClass}>
            {achievementCategories.map((c) =>
            <option key={c.id} value={c.id}>
                {c.number} — {c.label}
              </option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="ach-date" className={labelClass}>Date</label>
          <MonthYearInput id="ach-date" value={date} onChange={setDate} />
        </div>
      </div>
      <div>
        <label htmlFor="ach-title" className={labelClass}>Title</label>
        <input
          id="ach-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError(false);
          }}
          className={inputClass}
          aria-invalid={titleError ? true : undefined}
          aria-describedby={titleError ? 'ach-title-error' : undefined} />
        
        {titleError && <p id="ach-title-error" className="mt-1.5 text-xs text-red-700">Enter a title.</p>}
      </div>
      <div>
        <label htmlFor="ach-desc" className={labelClass}>Short description</label>
        <textarea id="ach-desc" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="ach-highlights" className={labelClass}>
          {category === 'internship' ? 'Related accomplishments' : 'Highlights'} <span className="font-normal text-muted">(optional, one per line)</span>
        </label>
        <textarea id="ach-highlights" rows={3} value={highlights} onChange={(e) => setHighlights(e.target.value)} className={inputClass} />
      </div>
      {isInternship &&
      <div className="space-y-3 rounded-2xl border border-line bg-canvas p-4 sm:p-5">
          <p className="text-sm font-medium text-ink">Internship video</p>
          <p className="text-xs leading-relaxed text-muted">
            Paste a YouTube, Vimeo, or Google Drive link, or upload an MP4/WebM. Links work on every device; uploaded files stay in this browser.
          </p>
          <div>
            <label htmlFor="ach-video-url" className={labelClass}>Video link</label>
            <input
            id="ach-video-url"
            type="url"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setVideoError(null);
            }}
            placeholder="https://www.youtube.com/watch?v=…"
            aria-invalid={videoError ? true : undefined}
            aria-describedby={videoError ? 'ach-video-url-error' : undefined}
            className={inputClass} />
            
            {videoError && <p id="ach-video-url-error" className="mt-1.5 text-xs text-red-700">{videoError}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FileInputButton
            accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov,.m4v"
            onFiles={async (list) => {
              files.filter(isVideoFile).forEach((file) => removeFile(file.id));
              await addFiles(list.slice(0, 1));
            }}
            className={buttonStyles.small}>
            
              <UploadIcon className="h-3.5 w-3.5" aria-hidden="true" /> Upload video file
            </FileInputButton>
            {videoFile &&
          <button type="button" onClick={() => removeFile(videoFile.id)} className={buttonStyles.smallDanger}>
                Remove uploaded video
              </button>
            }
          </div>
          {(videoUrl.trim() || videoFile) &&
        <div className="overflow-hidden rounded-2xl">
              <VideoPlayer title={`${title || 'Internship'} video`} url={videoUrl} file={videoFile} className="rounded-2xl" />
            </div>
          }
        </div>
      }
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-ink">Certificates & supporting documents</p>
          <FileInputButton accept="image/*,application/pdf,.pdf,.doc,.docx" multiple onFiles={(list) => addFiles(list)} className={buttonStyles.small}>
            <UploadIcon className="h-3.5 w-3.5" aria-hidden="true" /> Upload files
          </FileInputButton>
        </div>
        {files.filter((file) => !isVideoFile(file)).length ?
        <DocumentViewer files={files.filter((file) => !isVideoFile(file))} onRemove={removeFile} /> :

        <p className="rounded-2xl border border-dashed border-line bg-canvas px-5 py-6 text-sm text-muted">
            Upload certificates, reports, or photos (PDF or image).
          </p>
        }
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-5">
        {onDelete ?
        <button type="button" onClick={onDelete} className={buttonStyles.smallDanger}>
            <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" /> Delete achievement
          </button> :

        <span />
        }
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className={buttonStyles.ghost}>Cancel</button>
          <button type="submit" className={buttonStyles.primary}>{isNew ? 'Add achievement' : 'Save changes'}</button>
        </div>
      </div>
    </form>);

}