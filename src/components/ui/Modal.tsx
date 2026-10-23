import React, { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const sizes = { md: 'sm:max-w-lg', lg: 'sm:max-w-2xl', xl: 'sm:max-w-4xl' };

export function Modal({ open, onClose, title, description, size = 'lg', children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => panelRef.current?.focus(), 20);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(timer);
      previousFocus?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}>
        
          <div className="absolute inset-0 bg-ink/50" onClick={onClose} aria-hidden="true" />
          <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-ink/10 bg-surface shadow-2xl outline-none sm:rounded-2xl ${sizes[size]}`}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex items-center gap-3 border-b border-line bg-sand/60 px-4 py-2.5">
              <button
              type="button"
              onClick={onClose}
              className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF5F57]"
              aria-label="Close dialog">
              
                <XIcon className="h-2.5 w-2.5 text-ink/70 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" />
              </button>
              <span className="h-3.5 w-3.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#28C840]" aria-hidden="true" />
              <button
              type="button"
              onClick={onClose}
              className="ml-auto rounded-lg p-1.5 text-muted transition-colors duration-150 hover:bg-sand hover:text-ink"
              aria-label="Close">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="px-6 pb-4 pt-5 sm:px-8">
              <h2 id={titleId} className="font-display text-2xl font-bold tracking-tight text-ink">
                {title}
              </h2>
              {description && <p className="mt-1 text-sm text-muted">{description}</p>}
            </div>
            <div className="overflow-y-auto px-6 pb-8 sm:px-8">{children}</div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}