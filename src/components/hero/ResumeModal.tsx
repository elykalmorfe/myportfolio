import React from 'react';
import { FileTextIcon, UploadIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { deleteFile, saveFile } from '../../utils/fileStore';
import { FileInputButton } from '../ui/FileInputButton';
import { FilePreview } from '../ui/FilePreview';
import { Modal } from '../ui/Modal';
import { buttonStyles } from '../ui/styles';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const RESUME_ACCEPT = 'application/pdf,.pdf,.doc,.docx';

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const { content, update, editMode } = usePortfolio();
  const resume = content.profile.resume;

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const stored = await saveFile(file);
    if (resume) deleteFile(resume.id).catch(() => undefined);
    update((c) => ({ ...c, profile: { ...c.profile, resume: stored } }));
  };

  const handleRemove = () => {
    if (!resume) return;
    deleteFile(resume.id).catch(() => undefined);
    update((c) => ({ ...c, profile: { ...c.profile, resume: null } }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      title="Resume"
      description={editMode ? 'Upload or replace the resume. Visitors get it by scanning the QR code on Home.' : 'Preview and download.'}>
      
      {resume ?
      <div className="space-y-4">
          <FilePreview file={resume} onRemove={editMode ? handleRemove : undefined} />
          {editMode &&
        <FileInputButton accept={RESUME_ACCEPT} onFiles={handleUpload} className={buttonStyles.secondary}>
              <UploadIcon className="h-4 w-4" aria-hidden="true" /> Replace resume
            </FileInputButton>
        }
        </div> :

      <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-canvas px-6 py-14 text-center">
          <FileTextIcon className="h-10 w-10 text-clay" aria-hidden="true" />
          <h3 className="mt-4 font-display text-xl text-ink">No resume uploaded yet</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {editMode ?
          'Upload a PDF so visitors can view and download it by scanning the QR code.' :
          'The resume will be available here soon. In the meantime, feel free to get in touch.'}
          </p>
          <div className="mt-6">
            {editMode ?
          <FileInputButton accept={RESUME_ACCEPT} onFiles={handleUpload} className={buttonStyles.primary}>
                <UploadIcon className="h-4 w-4" aria-hidden="true" /> Upload resume (PDF)
              </FileInputButton> :

          <a href="#contact" onClick={onClose} className={buttonStyles.secondary}>
                Go to Contact
              </a>
          }
          </div>
        </div>
      }
    </Modal>);

}