import React from 'react';
import { FileTextIcon } from 'lucide-react';
import { achievementCategories } from '../../data/achievementCategories';
import { Achievement } from '../../types/portfolio';
import { formatMonth } from '../../utils/date';
import { isVideoFile } from '../../utils/fileStore';
import { DocumentViewer } from '../ui/DocumentViewer';
import { VideoPlayer, internshipVideoFile } from '../ui/VideoPlayer';

export function AchievementDetails({ achievement }: {achievement: Achievement;}) {
  const meta = achievementCategories.find((c) => c.id === achievement.category) ?? achievementCategories[0];
  const isInternship = achievement.category === 'internship';

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className={`rounded-full px-3 py-1 text-xs font-medium text-ink ${meta.tint}`}>
          {meta.number} · {meta.label}
        </span>
        <span className="tabular-nums text-muted">{formatMonth(achievement.date) || 'Date to be added'}</span>
      </div>

      <p className={`max-w-3xl leading-relaxed text-muted ${achievement.description ? 'whitespace-pre-line' : 'italic'}`}>
        {achievement.description || 'A description has not been added yet.'}
      </p>

      {isInternship &&
      <div>
          <h3 className="mb-3 text-sm font-medium text-ink">Internship video</h3>
          <div className="overflow-hidden rounded-2xl border border-line">
            <VideoPlayer
            title={`${achievement.title || 'Internship'} video`}
            url={achievement.videoUrl}
            file={internshipVideoFile(achievement.files)} />
          </div>
        </div>
      }

      {achievement.highlights.length > 0 &&
      <div>
          <h3 className="text-sm font-medium text-ink">{isInternship ? 'Related accomplishments' : 'Highlights'}</h3>
          <ul className="mt-3 space-y-2">
            {achievement.highlights.map((h, i) =>
          <li key={i} className="flex gap-3 leading-relaxed text-muted">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                {h}
              </li>
          )}
          </ul>
        </div>
      }

      <div>
        <h3 className="mb-3 text-sm font-medium text-ink">Supporting documents</h3>
        {achievement.files.filter((file) => !isVideoFile(file)).length ?
        <DocumentViewer files={achievement.files.filter((file) => !isVideoFile(file))} /> :

        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-line bg-canvas px-5 py-6 text-sm text-muted">
            <FileTextIcon className="h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
            No certificate or documents have been uploaded yet.
          </div>
        }
      </div>
    </div>);

}