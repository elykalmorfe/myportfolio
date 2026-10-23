import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, AtSignIcon, CheckIcon, ChevronRightIcon, FileCogIcon, MousePointer2Icon, QrCodeIcon, SendIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Profile } from '../../types/portfolio';
import { fileTypeLabel, formatBytes } from '../../utils/fileStore';
import { GitHubIcon } from '../icons/GitHubIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { EditableText } from '../ui/EditableText';
import { ProfilePhoto } from './ProfilePhoto';
import { QrModal } from './QrModal';
import { ResumeModal } from './ResumeModal';

const ease = [0.23, 1, 0.32, 1] as const;

export function HeroSection() {
  const { content, update, editMode } = usePortfolio();
  const { profile, contact } = content;
  const [qrOpen, setQrOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const nameParts = profile.name.trim().split(/\s+/).filter(Boolean);

  const setProfile = (patch: Partial<Profile>) => update((c) => ({ ...c, profile: { ...c.profile, ...patch } }));

  const menuItem =
  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-150';

  return (
    <section id="home" aria-label="Introduction" className="relative scroll-mt-20 overflow-hidden pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          aria-hidden="true"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="select-none text-center font-display text-[24vw] font-extrabold leading-[0.8] tracking-[-0.075em] text-ink lg:text-[15.5rem]">
          
          Portfolio
        </motion.p>

        <div className="relative mt-8 grid items-start gap-10 lg:-mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="order-3 flex flex-col gap-8 lg:order-1 lg:col-span-3 lg:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08, ease }}
              className="w-full max-w-[16rem] -rotate-3 rounded-2xl bg-ink p-4 text-white shadow-window">
              
              <p className="font-mono text-xs text-white/75">{new Date().getFullYear()} Edition</p>
              <div className="mt-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a href={`mailto:${contact.email}`} aria-label="Email" className="text-white/80 hover:text-white">
                    <AtSignIcon className="h-4 w-4" />
                  </a>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="text-white/80 hover:text-white">
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="text-white/80 hover:text-white">
                    <GitHubIcon className="h-4 w-4" />
                  </a>
                </div>
                <a href="#contact" aria-label="Go to contact" className="text-white/80 hover:text-white">
                  <SendIcon className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
            <EditableText
              label="Headline"
              value={profile.headline}
              onChange={(headline) => setProfile({ headline })}
              placeholder="Add a short professional headline"
              className="max-w-[16rem] font-display text-xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink" />
            
          </div>

          <div className="order-2 lg:col-span-5">
            <ProfilePhoto />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12, ease }}
            className="order-1 lg:order-3 lg:col-span-4 lg:pt-24">
            
            {editMode ?
            <EditableText
              as="h1"
              label="Your name"
              value={profile.name}
              onChange={(name) => setProfile({ name })}
              placeholder="Your name"
              className="font-display text-4xl font-extrabold uppercase tracking-tight text-ink" /> :


            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.86] tracking-[-0.045em] text-ink sm:text-6xl lg:text-right">
                {nameParts.map((part) =>
              <span key={part} className="block">
                    {part}
                  </span>
              )}
              </h1>
            }
            <EditableText
              label="Introduction"
              multiline
              value={profile.intro}
              onChange={(intro) => setProfile({ intro })}
              placeholder="Add a concise introduction"
              className="mt-5 text-[15px] leading-relaxed text-muted lg:text-right" />
            

            <div role="group" aria-label="Quick actions" className="mt-7 rotate-[1.5deg] rounded-2xl bg-ink p-2 text-white shadow-window">
              <button type="button" onClick={() => setQrOpen(true)} className={`${menuItem} bg-folder hover:bg-folder-dark`}>
                <QrCodeIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="flex-1">View My QR Code</span>
                {profile.resume ?
                <CheckIcon className="h-4 w-4" aria-hidden="true" /> :

                <ChevronRightIcon className="h-4 w-4 text-white/60" aria-hidden="true" />
                }
              </button>
              <a href="#contact" className={`${menuItem} hover:bg-white/10`}>
                <MousePointer2Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="flex-1">Contact Me</span>
                <ArrowDownIcon className="h-4 w-4 text-white/60" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted lg:justify-end">
              {profile.resume ?
              <span>
                  resume · {fileTypeLabel(profile.resume)} · {formatBytes(profile.resume.size)}
                </span> :

              <span>resume not uploaded yet</span>
              }
              {editMode &&
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-1 font-sans font-medium text-clay underline-offset-4 hover:underline">
                
                  <FileCogIcon className="h-3.5 w-3.5" aria-hidden="true" /> Upload or preview resume
                </button>
              }
            </div>
          </motion.div>
        </div>
      </div>

      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>);

}