import React from 'react';
import { motion } from 'framer-motion';
import { CameraIcon, Trash2Icon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useFileUrl } from '../../hooks/useFileUrl';
import { deleteFile, saveFile } from '../../utils/fileStore';
import { optimizeImage } from '../../utils/image';
import { FileInputButton } from '../ui/FileInputButton';

const folderButton =
'inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors duration-150 hover:bg-sand';

export function ProfilePhoto() {
  const { content, update, editMode } = usePortfolio();
  const { photo, name } = content.profile;
  const { url, status } = useFileUrl(photo);
  const initials = name.
  split(' ').
  filter(Boolean).
  map((part) => part[0]).
  slice(0, 2).
  join('').
  toUpperCase();

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const stored = await saveFile(await optimizeImage(file, 1400));
    const previous = content.profile.photo;
    update((c) => ({ ...c, profile: { ...c.profile, photo: stored } }));
    if (previous) deleteFile(previous.id).catch(() => undefined);
  };

  const handleRemove = () => {
    if (!photo) return;
    deleteFile(photo.id).catch(() => undefined);
    update((c) => ({ ...c, profile: { ...c.profile, photo: null } }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
      className="relative z-10 mx-auto w-full max-w-md">
      
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="relative aspect-[6/5]">
        <div className="absolute left-0 top-0 h-[16%] w-[40%] rounded-t-2xl bg-folder-light" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 top-[10%] rounded-2xl rounded-tl-none bg-folder-light" aria-hidden="true" />

        <div className="absolute bottom-[14%] left-[8%] right-[8%] top-[4%] -rotate-2 overflow-hidden rounded-lg border-[5px] border-white bg-sand shadow-soft">
          {url ?
          <img src={url} alt={`Portrait of ${name}`} className="h-full w-full object-cover object-top" /> :
          status === 'loading' ?
          <div className="h-full w-full animate-pulse bg-sand" /> :

          <div className="flex h-[55%] w-full items-center justify-center">
              <span className="font-display text-6xl font-extrabold tracking-tight text-folder" aria-hidden="true">
                {initials || 'EA'}
              </span>
            </div>
          }
        </div>

        <motion.div
          variants={{
            rest: { top: '66%' },
            hover: { top: '78%' }
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-x-0 bottom-0 flex flex-col justify-end rounded-2xl bg-folder p-4 shadow-window sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <span className="font-mono text-xs text-white">{photo ? photo.name : 'profile_photo.jpg'}</span>
            {editMode &&
            <div className="flex flex-wrap gap-1.5">
                <FileInputButton accept="image/*" onFiles={handleUpload} className={folderButton}>
                  <CameraIcon className="h-3.5 w-3.5" aria-hidden="true" /> {photo ? 'Replace photo' : 'Upload photo'}
                </FileInputButton>
                {photo &&
              <button type="button" onClick={handleRemove} className={`${folderButton} !text-red-700`}>
                    <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" /> Remove
                  </button>
              }
              </div>
            }
          </div>
        </motion.div>
      </motion.div>
    </motion.div>);

}