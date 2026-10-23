import React, { useEffect, useState } from 'react';
import qrcode from 'qrcode-generator';
import { DownloadIcon, LinkIcon, QrCodeIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { downloadStoredFile } from '../../utils/fileStore';
import { getResumeShareUrl, isValidUrl } from '../../utils/validation';
import { Modal } from '../ui/Modal';
import { buttonStyles, inputClass, labelClass } from '../ui/styles';

interface QrModalProps {
  open: boolean;
  onClose: () => void;
}

function renderQrPng(text: string): string {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const count = qr.getModuleCount();
  const margin = 2;
  const cell = Math.max(4, Math.floor(720 / (count + margin * 2)));
  const size = (count + margin * 2) * cell;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#1F1B16';
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) ctx.fillRect((c + margin) * cell, (r + margin) * cell, cell, cell);
    }
  }
  return canvas.toDataURL('image/png');
}

export function QrModal({ open, onClose }: QrModalProps) {
  const { content, update, editMode } = usePortfolio();
  const resume = content.profile.resume;
  const shareUrl = getResumeShareUrl(content.profile.portfolioUrl, content.profile.resumeUrl);
  const valid = isValidUrl(shareUrl);
  const usesDirectFile = Boolean(content.profile.resumeUrl.trim()) && shareUrl === content.profile.resumeUrl.trim();

  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState(false);
  const [siteDraft, setSiteDraft] = useState(content.profile.portfolioUrl);
  const [resumeDraft, setResumeDraft] = useState(content.profile.resumeUrl);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [downloadFailed, setDownloadFailed] = useState(false);

  useEffect(() => {
    if (open) {
      setSiteDraft(content.profile.portfolioUrl);
      setResumeDraft(content.profile.resumeUrl);
      setDownloadFailed(false);
    }
  }, [open, content.profile.portfolioUrl, content.profile.resumeUrl]);

  useEffect(() => {
    if (!open || !valid) {
      setQrDataUrl(null);
      return;
    }
    setGenerationError(false);
    try {
      setQrDataUrl(renderQrPng(shareUrl));
    } catch {
      setGenerationError(true);
    }
  }, [open, shareUrl, valid]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const site = siteDraft.trim();
    const resumeLink = resumeDraft.trim();
    if (site && !isValidUrl(site)) {
      setDraftError('Enter a full site URL starting with https://');
      return;
    }
    if (resumeLink && !isValidUrl(resumeLink)) {
      setDraftError('Enter a full resume URL starting with https://');
      return;
    }
    setDraftError(null);
    update((c) => ({ ...c, profile: { ...c.profile, portfolioUrl: site, resumeUrl: resumeLink } }));
  };

  const handleDownloadHere = async () => {
    if (!resume) return;
    const ok = await downloadStoredFile(resume);
    setDownloadFailed(!ok);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Resume QR code"
      description="Scan this code to open, view, and download the resume on your phone.">
      
      <div className="flex flex-col items-center">
        <div className="flex aspect-square w-full max-w-[260px] items-center justify-center rounded-2xl border border-line bg-white p-3">
          {qrDataUrl ?
          <img src={qrDataUrl} alt={`QR code linking to the resume at ${shareUrl}`} className="h-full w-full" /> :

          <div className="flex flex-col items-center gap-2 px-6 text-center text-sm text-muted">
              <QrCodeIcon className="h-10 w-10 text-clay/70" aria-hidden="true" />
              {generationError ?
            'Could not generate the QR code. Check the URL.' :
            valid ?
            'Generating…' :
            'No URL yet. Add a public resume link or site address to generate the QR code.'}
            </div>
          }
        </div>

        {valid &&
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex max-w-full items-center gap-1.5 text-sm text-clay underline-offset-4 hover:underline">
          
            <LinkIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{shareUrl}</span>
          </a>
        }
        {valid &&
        <p className="mt-1 text-center text-xs text-muted">
            {usesDirectFile ?
          'Opens the resume file directly after scanning.' :
          'Opens a resume page that shows the file and starts a download.'}
          </p>
        }

        <div className="mt-6 flex w-full max-w-sm flex-col gap-2">
          {resume &&
          <button type="button" onClick={handleDownloadHere} className={buttonStyles.primary}>
              <DownloadIcon className="h-4 w-4" aria-hidden="true" /> Download resume on this device
            </button>
          }
          {downloadFailed &&
          <p className="text-center text-xs text-red-700">Download failed — upload the resume in Edit mode first.</p>
          }
          {qrDataUrl &&
          <a href={qrDataUrl} download="elyka-almorfe-resume-qr.png" className={resume ? buttonStyles.secondary : buttonStyles.primary}>
              <DownloadIcon className="h-4 w-4" aria-hidden="true" /> Download QR code (PNG)
            </a>
          }
        </div>
      </div>

      {editMode &&
      <form onSubmit={handleSave} className="mt-8 border-t border-line pt-6" noValidate>
          <label htmlFor="resume-url" className={labelClass}>
            Public resume file URL
          </label>
          <input
          id="resume-url"
          type="url"
          value={resumeDraft}
          onChange={(e) => setResumeDraft(e.target.value)}
          placeholder="https://your-site.com/resume.pdf"
          aria-invalid={draftError ? true : undefined}
          className={inputClass} />
        
          <label htmlFor="portfolio-url" className={`${labelClass} mt-4`}>
            Public portfolio URL
          </label>
          <input
          id="portfolio-url"
          type="url"
          value={siteDraft}
          onChange={(e) => setSiteDraft(e.target.value)}
          placeholder="https://your-portfolio.com"
          aria-describedby="qr-url-help"
          className={inputClass} />
        
          <button type="submit" className={`${buttonStyles.secondary} mt-3`}>
            Save URLs
          </button>
          <p id="qr-url-help" className={`mt-2 text-xs ${draftError ? 'text-red-700' : 'text-muted'}`}>
            {draftError ??
            'If you paste a direct resume link, scanning opens that file. Otherwise the QR opens this site\'s resume page. After you deploy, save the live site URL so phones can reach it.'}
          </p>
        </form>
      }
    </Modal>);

}
