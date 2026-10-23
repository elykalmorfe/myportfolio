import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, DownloadIcon, FileTextIcon, FolderIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { downloadBlob, downloadStoredFile } from '../../utils/fileStore';
import { FilePreview } from '../ui/FilePreview';
import { buttonStyles } from '../ui/styles';
import { WindowFrame } from '../ui/WindowFrame';

const PUBLIC_RESUME = `${import.meta.env.BASE_URL}resume.pdf`;

export function ResumePage() {
  const { content } = usePortfolio();
  const { profile } = content;
  const resume = profile.resume;
  const resumeUrl = profile.resumeUrl.trim();
  const downloaded = useRef(false);
  const [publicFile, setPublicFile] = useState<{ blob: Blob;url: string; } | null>(null);
  const [publicMissing, setPublicMissing] = useState(false);

  useEffect(() => {
    document.title = `Resume — ${profile.name}`;
    return () => {
      document.title = 'Personal Portfolio Website';
    };
  }, [profile.name]);

  useEffect(() => {
    if (resume) return;
    let active = true;
    let objectUrl: string | null = null;

    fetch(PUBLIC_RESUME).
    then(async (response) => {
      if (!response.ok) throw new Error('missing');
      const type = response.headers.get('content-type') ?? '';
      if (!type.includes('pdf')) throw new Error('missing');
      const blob = await response.blob();
      if (!active) return;
      objectUrl = URL.createObjectURL(blob);
      setPublicFile({ blob, url: objectUrl });
    }).
    catch(() => {
      if (!active) return;
      setPublicMissing(true);
      if (resumeUrl) window.location.replace(resumeUrl);
    });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [resume, resumeUrl]);

  useEffect(() => {
    if (downloaded.current) return;
    if (resume) {
      downloaded.current = true;
      downloadStoredFile(resume).catch(() => undefined);
      return;
    }
    if (publicFile) {
      downloaded.current = true;
      downloadBlob(publicFile.blob, `${profile.name.replace(/\s+/g, '-').toLowerCase()}-resume.pdf`);
    }
  }, [resume, publicFile, profile.name]);

  const hasLocal = Boolean(resume);
  const hasPublic = Boolean(publicFile);
  const waiting = !hasLocal && !hasPublic && !publicMissing;

  return (
    <div className="min-h-screen w-full bg-canvas font-sans text-ink antialiased">
      <header className="px-3 pt-3 sm:px-6">
        <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 rounded-2xl bg-ink/95 px-4 text-white shadow-window">
          <a href="#home" className="flex items-center gap-2 font-mono text-sm">
            <FolderIcon className="h-4 w-4 fill-folder-light text-folder-light" aria-hidden="true" />
            elyka.portfolio
          </a>
          <a href="#home" className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 hover:text-white">
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Full portfolio
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Resume</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
        <p className="mt-3 max-w-xl text-muted">
          Scan complete. View the resume below — a download should start automatically. If it does not, use the download button.
        </p>

        <div className="mt-8">
          {hasLocal && resume && <FilePreview file={resume} />}

          {!hasLocal && hasPublic && publicFile &&
          <WindowFrame title="resume.pdf" bodyClassName="">
              <iframe src={publicFile.url} title={`Resume of ${profile.name}`} className="h-[70vh] w-full bg-white" />
              <div className="flex justify-end border-t border-line px-4 py-3">
                <button
                type="button"
                onClick={() => downloadBlob(publicFile.blob, `${profile.name.replace(/\s+/g, '-').toLowerCase()}-resume.pdf`)}
                className={buttonStyles.primary}>
                
                  <DownloadIcon className="h-4 w-4" aria-hidden="true" /> Download resume
                </button>
              </div>
            </WindowFrame>
          }

          {waiting &&
          <div className="flex min-h-[16rem] items-center justify-center rounded-2xl border border-line bg-surface text-sm text-muted">
              Opening resume…
            </div>
          }

          {!hasLocal && publicMissing && !resumeUrl &&
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-canvas px-6 py-16 text-center">
              <FileTextIcon className="h-10 w-10 text-clay" aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl text-ink">Resume is not available yet</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                The QR code opened this page, but a resume file has not been added. Please get in touch instead.
              </p>
              <a href="#contact" className={`${buttonStyles.secondary} mt-6`}>
                Go to Contact
              </a>
            </div>
          }
        </div>
      </main>
    </div>);

}
