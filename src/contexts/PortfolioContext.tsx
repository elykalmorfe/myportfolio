import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { defaultContent } from '../data/defaultContent';
import { ExperienceEntry, PortfolioContent } from '../types/portfolio';

interface PortfolioContextValue {
  content: PortfolioContent;
  update: (updater: (prev: PortfolioContent) => PortfolioContent) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  resetContent: () => void;
  storageError: boolean;
}

const STORAGE_KEY = 'elyka-portfolio-content-v1';
const previousCapCutLogoUrl = 'https://cdn.simpleicons.org/capcut/000000';
const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: {children: React.ReactNode;}) {
  const [content, setContent] = useState<PortfolioContent>(loadContent);
  const [editMode, setEditMode] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    setContent((prev) => {
      const experiences = mergeExperiences(prev.experiences);
      return experiences === prev.experiences ? prev : { ...prev, experiences };
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [content]);

  const update = useCallback((updater: (prev: PortfolioContent) => PortfolioContent) => {
    setContent((prev) => updater(prev));
  }, []);

  const resetContent = useCallback(() => setContent(defaultContent), []);

  return (
    <PortfolioContext.Provider value={{ content, update, editMode, setEditMode, resetContent, storageError }}>
      {children}
    </PortfolioContext.Provider>);

}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used inside PortfolioProvider');
  return ctx;
}

function isEmptyPlaceholder(entry: ExperienceEntry) {
  return !entry.role && !entry.organization && !entry.startDate && !entry.endDate && !entry.description;
}

function mergeExperiences(stored: ExperienceEntry[] | undefined): ExperienceEntry[] {
  if (!stored?.length || stored.every(isEmptyPlaceholder)) return defaultContent.experiences;

  const seenIds = new Set<string>();
  return stored.map((entry, index) => {
    if (!seenIds.has(entry.id)) {
      seenIds.add(entry.id);
      return entry;
    }
    const id = `${entry.id}-legacy-${index}`;
    seenIds.add(id);
    return { ...entry, id };
  });
}

function loadContent(): PortfolioContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as Partial<PortfolioContent>;
    const defaultAchievements = new Map(defaultContent.achievements.map((item) => [item.id, item]));
    return {
      profile: {
        ...defaultContent.profile,
        ...parsed.profile,
        photo: parsed.profile?.photo ?? defaultContent.profile.photo
      },
      about: { ...defaultContent.about, ...parsed.about },
      contact: { ...defaultContent.contact, ...parsed.contact },
      tools: (parsed.tools ?? defaultContent.tools).map((tool) =>
        tool.id === 'tool-capcut' && tool.logoUrl === previousCapCutLogoUrl && !tool.logoFile ?
          { ...tool, logoUrl: '/capcut-logo.png' } :
          tool
      ),
      experiences: mergeExperiences(parsed.experiences),
      achievements: (parsed.achievements ?? defaultContent.achievements).map((item) => {
        const defaultAchievement = defaultAchievements.get(item.id);
        if (!defaultAchievement) {
          return {
            ...item,
            videoUrl: item.videoUrl ?? '',
            files: item.files ?? []
          };
        }
        return {
          ...defaultAchievement,
          ...item,
          title: item.title || defaultAchievement.title,
          date: item.date || defaultAchievement.date,
          description: item.description || defaultAchievement.description,
          highlights: item.highlights?.length ? item.highlights : defaultAchievement.highlights,
          videoUrl: item.videoUrl || defaultAchievement?.videoUrl || '',
          files: item.files?.length ? item.files : defaultAchievement?.files ?? []
        };
      }),
    };
  } catch {
    return defaultContent;
  }
}