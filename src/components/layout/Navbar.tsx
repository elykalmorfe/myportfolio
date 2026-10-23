import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, FolderIcon, MenuIcon, XIcon } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';

export function Navbar() {
  const active = useActiveSection(navItems.map((item) => item.id));
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-2xl bg-ink/95 pl-4 pr-2 text-white shadow-window backdrop-blur">
        
        <a href="#home" className="flex items-center gap-2 font-mono text-sm">
          <FolderIcon className="h-4 w-4 fill-folder-light text-folder-light" aria-hidden="true" />
          elyka.portfolio
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-xl px-3.5 py-2 text-sm transition-colors duration-150 ${
                  isActive ? 'text-ink' : 'text-white/70 hover:text-white'}`
                  }>
                  
                  {isActive &&
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-white"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }} />

                  }
                  <span className="relative">{item.label}</span>
                </a>
              </li>);

          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-xl p-2 text-white hover:bg-white/10 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            
            {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen &&
        <motion.ul
          id="mobile-nav"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto mt-2 max-w-6xl origin-top space-y-0.5 rounded-2xl bg-ink p-2 text-white shadow-window lg:hidden">
          
            {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                  <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base ${
                  isActive ? 'bg-white font-medium text-ink' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
                  }>
                  
                    {item.label}
                    {isActive && <CheckIcon className="h-4 w-4" aria-hidden="true" />}
                  </a>
                </li>);

          })}
          </motion.ul>
        }
      </AnimatePresence>
    </header>);

}