import React from 'react';
import { ArrowUpRightIcon, MailIcon, MapPinIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { ContactInfo } from '../../types/portfolio';
import { GitHubIcon } from '../icons/GitHubIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { EditableText } from '../ui/EditableText';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from './ContactForm';

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function ContactSection() {
  const { content, update, editMode } = usePortfolio();
  const { contact } = content;
  const setField = (key: keyof ContactInfo, value: string) => update((c) => ({ ...c, contact: { ...c.contact, [key]: value } }));

  const links = [
  { key: 'email' as const, label: 'Email', icon: <MailIcon className="h-4 w-4" aria-hidden="true" />, href: `mailto:${contact.email}`, display: contact.email, external: false },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: <LinkedInIcon className="h-4 w-4" />, href: contact.linkedin, display: stripProtocol(contact.linkedin), external: true },
  { key: 'github' as const, label: 'GitHub', icon: <GitHubIcon className="h-4 w-4" />, href: contact.github, display: stripProtocol(contact.github), external: true }];


  const iconTile = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white';

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 pb-24 pt-24 sm:pb-28 sm:pt-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="~/portfolio/contact"
            title="Contact"
            description="Recruiters, organizations, and collaborators are all welcome. Reach out directly or send a message — I'd love to hear from you." />
          
          <ul className="mt-10 -rotate-1 space-y-0.5 rounded-2xl bg-ink p-2 text-white shadow-window">
            {links.map((link) =>
            <li key={link.key}>
                {editMode ?
              <div className="flex items-center gap-4 rounded-xl px-3 py-3">
                    <span className={iconTile}>{link.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] uppercase tracking-wide text-white/70">{link.label}</p>
                      <EditableText label={link.label} value={contact[link.key]} onChange={(v) => setField(link.key, v)} placeholder={link.label} className="mt-1 text-sm text-ink" />
                    </div>
                  </div> :

              <a
                href={link.href}
                {...link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
                className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-150 hover:bg-white/10">
                
                    <span className={iconTile}>{link.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] uppercase tracking-wide text-white/70">{link.label}</span>
                      <span className="block truncate text-sm font-medium">{link.display}</span>
                    </span>
                    <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-white/60 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    {link.external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
              }
              </li>
            )}
            <li className="flex items-center gap-4 rounded-xl px-3 py-3">
              <span className={iconTile}>
                <MapPinIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] uppercase tracking-wide text-white/70">Location</p>
                {editMode ?
                <EditableText label="Location" value={contact.location} onChange={(v) => setField('location', v)} placeholder="City, Province" className="mt-1 text-sm text-ink" /> :

                <p className={`text-sm ${contact.location ? 'font-medium' : 'italic text-white/70'}`}>{contact.location || 'Tandag City, Surigao del Sur'}</p>
                }
              </div>
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>);

}