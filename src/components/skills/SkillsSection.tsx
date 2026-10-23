import React from 'react';
import { creativeSystem } from '../../data/skills';
import { SectionHeading } from '../ui/SectionHeading';
import { WindowFrame } from '../ui/WindowFrame';
import { ToolkitSection } from './ToolkitSection';

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="skills-title"
          eyebrow="My Creative Operating System"
          title="Different disciplines. One curious mind."
          description="I enjoy exploring the space between technology and creativity. From building functional digital solutions to crafting visual stories, I approach every project with curiosity, intention, and a willingness to experiment." />
        

        <div className="mt-12 rounded-[2rem] bg-folder p-3 sm:p-5 lg:p-6">
          <div className="mb-3 flex items-center justify-between px-2 font-mono text-xs text-white">
            <span>creative_os</span>
            <span>{creativeSystem.length} modules running</span>
          </div>
          <ul className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {creativeSystem.map((group) =>
            <li key={group.number} className="group">
                <WindowFrame
                title={`${group.number} — ${group.slug}.app`}
                barClassName={group.barHover}
                className="flex h-full flex-col transition-transform duration-200 ease-out group-hover:-translate-y-1"
                bodyClassName="flex flex-1 flex-col p-6 sm:p-8">
                
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-5xl font-extrabold leading-none tracking-[-0.05em] text-ink">{group.number}</span>
                    <span className={`rounded-md px-2 py-1 font-mono text-[11px] text-ink ${group.tintClass}`}>{group.skills.length} skills</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">
                    <span className="sr-only">{group.number} — </span>
                    {group.title}
                  </h3>
                  <p className="mt-1.5 text-muted">{group.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${group.title} skills`}>
                    {group.skills.map((skill) =>
                  <li key={skill} className="rounded-md border border-line bg-canvas px-2.5 py-1 text-[13px] text-ink">
                        {skill}
                      </li>
                  )}
                  </ul>
                </WindowFrame>
              </li>
            )}
          </ul>
        </div>

        <ToolkitSection />
      </div>
    </section>);

}