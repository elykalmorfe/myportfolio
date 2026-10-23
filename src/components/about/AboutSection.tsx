import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { aboutDetailFields } from '../../data/aboutFields';
import { useFileUrl } from '../../hooks/useFileUrl';
import { About } from '../../types/portfolio';
import { EditableText } from '../ui/EditableText';
import { SectionHeading } from '../ui/SectionHeading';
import { WindowFrame } from '../ui/WindowFrame';

const tabs: {key: keyof About;label: string;placeholder: string;}[] = [
{ key: 'introduction', label: 'Introduction', placeholder: 'I am a passionate Bachelor of Science in Computer Science student with a strong interest in technology, digital creativity, and software development. I enjoy combining technical knowledge with creative ideas to develop meaningful digital experiences. Driven by curiosity and continuous learning, I strive to improve my skills, explore emerging technologies, and create work that is both functional and visually engaging.' },
...aboutDetailFields];


export function AboutSection() {
  const { content, update } = usePortfolio();
  const { about, profile } = content;
  const [active, setActive] = useState<keyof About>('introduction');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { url } = useFileUrl(profile.photo);
  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];
  const firstName = profile.name.trim().split(/\s+/)[0] || 'there';

  const setField = (key: keyof About, value: string) => update((c) => ({ ...c, about: { ...c.about, [key]: value } }));

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="about-title" eyebrow="~/portfolio/about-me" title="About Me" />

        <div className="mt-12">
          <div role="tablist" aria-label="About Me" className="flex gap-1 overflow-x-auto pl-3 sm:pl-6">
            {tabs.map((tab, i) => {
              const selected = tab.key === active;
              return (
                <button
                  key={tab.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`about-tab-${tab.key}`}
                  aria-selected={selected}
                  aria-controls="about-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.key)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`shrink-0 whitespace-nowrap rounded-t-2xl px-4 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors duration-150 sm:px-5 ${
                  selected ? 'bg-folder text-white' : 'bg-sky text-ink hover:bg-folder-light'}`
                  }>
                  
                  {tab.label}
                </button>);

            })}
          </div>

          <div className="rounded-3xl bg-folder p-3 sm:p-6 lg:p-8">
            <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
              <WindowFrame title={profile.photo ? profile.photo.name : 'photo_elyka.jpg'} bodyClassName="aspect-[4/3] bg-sand lg:aspect-auto lg:h-[calc(100%-2.5rem)]">
                {url ?
                <img src={url} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover object-top" /> :

                <div className="flex h-full min-h-[14rem] flex-col items-center justify-center gap-2">
                    <span className="font-display text-6xl font-extrabold tracking-tight text-folder" aria-hidden="true">
                      {profile.name.
                    split(' ').
                    map((p) => p[0]).
                    slice(0, 2).
                    join('')}
                    </span>
                    <span className="font-mono text-xs text-muted">no photo yet</span>
                  </div>
                }
              </WindowFrame>

              <div
                role="tabpanel"
                id="about-panel"
                aria-labelledby={`about-tab-${active}`}
                className="flex min-h-[20rem] flex-col rounded-2xl bg-surface p-6 shadow-window sm:p-8">
                
                <p className="inline-flex self-start rounded-full border-2 border-ink px-4 py-1.5 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Hi! I'm {firstName}
                </p>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-8">
                  
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-clay">{activeTab.label}</h3>
                  <EditableText
                    label={activeTab.label}
                    multiline
                    value={about[active]}
                    onChange={(v) => setField(active, v)}
                    placeholder={activeTab.placeholder}
                    className="mt-3 text-lg leading-relaxed text-ink/85" />
                  
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}