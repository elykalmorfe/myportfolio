import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangleIcon, InfoIcon, PencilIcon, RotateCcwIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { buttonStyles } from '../ui/styles';

export function EditBanner() {
  const { editMode, setEditMode, resetContent, storageError } = usePortfolio();
  const [showInfo, setShowInfo] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all text and lists to the original defaults? Uploaded file references will be cleared.')) {
      resetContent();
    }
  };

  return (
    <AnimatePresence>
      {editMode &&
      <motion.div
        role="region"
        aria-label="Editing controls"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-4 shadow-2xl sm:inset-x-6">
        
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-peach text-clay">
              <PencilIcon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">Editing mode is on</p>
              <p className="text-xs text-muted">Changes and uploads save in this browser only.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setShowInfo((v) => !v)} aria-expanded={showInfo} className={buttonStyles.small}>
                <InfoIcon className="h-3.5 w-3.5" aria-hidden="true" /> Storage details
              </button>
              <button type="button" onClick={handleReset} className={buttonStyles.small}>
                <RotateCcwIcon className="h-3.5 w-3.5" aria-hidden="true" /> Reset
              </button>
              <button type="button" onClick={() => setEditMode(false)} className={`${buttonStyles.primary} !px-4 !py-1.5 !text-xs`}>
                Done
              </button>
            </div>
          </div>
          {showInfo &&
        <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              Text is kept in this browser's local storage and files in its IndexedDB. Visitors on other devices won't see these
              uploads. To publish them for everyone, connect persistent hosting (for example Supabase Storage or Firebase) or bundle
              the final files with the site before deploying. The contact form also needs a delivery endpoint — set it in the
              Contact section.
            </p>
        }
          {storageError &&
        <p role="alert" className="mt-3 flex items-center gap-2 text-xs text-red-700">
              <AlertTriangleIcon className="h-3.5 w-3.5" aria-hidden="true" /> Browser storage is full — recent text changes may not be saved.
            </p>
        }
        </motion.div>
      }
    </AnimatePresence>);

}