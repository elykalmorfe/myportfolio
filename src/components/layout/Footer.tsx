import React from 'react';
import { ArrowUpIcon, FolderIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

export function Footer() {
  const { content } = usePortfolio();
  return (
    <footer className="px-3 pb-3 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink px-3 py-2.5 text-sm text-white">
        <div className="flex items-center gap-3">
          <a href="#home" className="inline-flex items-center gap-2 rounded-xl bg-folder px-3 py-1.5 font-mono text-xs font-medium hover:bg-folder-dark">
            <FolderIcon className="h-3.5 w-3.5 fill-white" aria-hidden="true" /> start
          </a>
          <p className="text-white/75">
            © {new Date().getFullYear()} {content.profile.name}
          </p>
        </div>
        <a href="#home" className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-white/75 hover:bg-white/10 hover:text-white">
          Back to top <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>);

}