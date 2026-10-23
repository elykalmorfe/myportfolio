import React from 'react';
import { ArrowUpRightIcon, FileBadgeIcon, PaperclipIcon, VideoIcon } from 'lucide-react';
import { achievementCategories } from '../../data/achievementCategories';
import { Achievement } from '../../types/portfolio';
import { formatMonth } from '../../utils/date';
import { isVideoFile } from '../../utils/fileStore';
import { VideoPlayer, hasInternshipVideo, internshipVideoFile } from '../ui/VideoPlayer';

interface AchievementTimelineItemProps {
  achievement: Achievement;
  onOpen: () => void;
}

export function AchievementTimelineItem({ achievement, onOpen }: AchievementTimelineItemProps) {
  const meta = achievementCategories.find((c) => c.id === achievement.category) ?? achievementCategories[0];
  const date = formatMonth(achievement.date) || 'Date to be added';
  const docCount = achievement.files.filter((file) => !isVideoFile(file)).length;
  const fileLabel = docCount ? `${docCount} document${docCount > 1 ? 's' : ''}` : 'No documents yet';
  const hasVideo = hasInternshipVideo(achievement);

  if (achievement.category === 'internship') {
    return (
      <li className="relative pl-7 sm:pl-10">
        <span className="absolute -left-px top-12 h-4 w-4 -translate-x-1/2 rounded-full bg-folder ring-4 ring-surface" aria-hidden="true" />
        <article className="group relative pt-5">
          <span className="absolute left-0 top-0 flex h-6 w-40 items-center rounded-t-xl bg-folder px-3 font-mono text-[11px] text-white" aria-hidden="true">
            internship/
          </span>
          <div className="relative rounded-2xl rounded-tl-none bg-folder p-6 text-white shadow-window sm:p-8">
            <button type="button" onClick={onOpen} className="w-full text-left">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                <span className="-rotate-2 bg-peach px-2.5 py-1 font-semibold text-ink">
                  {meta.number} · {meta.label}
                </span>
                <span className="text-white">Major professional milestone</span>
                <span className="ml-auto font-mono text-white">{date}</span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{achievement.title || 'Internship'}</h3>
              <p className="mt-3 line-clamp-3 max-w-2xl leading-relaxed text-white">
                {achievement.description || 'Internship description, accomplishments, supporting documents, and video will appear here.'}
              </p>
            </button>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/15 bg-ink/40">
              <VideoPlayer
                title={`${achievement.title || 'Internship'} video`}
                url={achievement.videoUrl}
                file={internshipVideoFile(achievement.files)}
                className="rounded-xl" />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-ink/90 px-4 py-3 text-sm">
              <span className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/85">
                <span className="flex items-center gap-2">
                  <PaperclipIcon className="h-4 w-4" aria-hidden="true" /> {fileLabel}
                </span>
                <span className="flex items-center gap-2">
                  <VideoIcon className="h-4 w-4" aria-hidden="true" /> {hasVideo ? 'Video added' : 'Video slot'}
                </span>
              </span>
              <button type="button" onClick={onOpen} className="flex items-center gap-1.5 font-medium">
                View internship details
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
      </li>);

  }

  return (
    <li className="relative pl-7 sm:pl-10">
      <span className="absolute -left-px top-7 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-folder bg-surface" aria-hidden="true" />
      <button
        type="button"
        onClick={onOpen}
        className="group flex w-full items-start gap-4 rounded-2xl border border-line bg-surface p-5 text-left transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-folder/40 hover:bg-sky/25">
        
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.tint}`} aria-hidden="true">
          <FileBadgeIcon className="h-5 w-5 text-ink" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="font-mono text-muted">
              {meta.number} · {meta.label}
            </span>
            <span className="ml-auto font-mono text-muted">{date}</span>
          </div>
          <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-ink">{achievement.title || 'Untitled achievement'}</h3>
          <p className={`mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted ${achievement.description ? '' : 'italic'}`}>
            {achievement.description || 'Description and certificate will appear here.'}
          </p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted">
              <PaperclipIcon className="h-3.5 w-3.5" aria-hidden="true" /> {fileLabel}
            </span>
            <span className="flex items-center gap-1 font-medium text-clay">
              View details
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </button>
    </li>);

}