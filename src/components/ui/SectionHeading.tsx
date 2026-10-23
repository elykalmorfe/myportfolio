import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ id, title, eyebrow, description, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={`max-w-2xl ${className}`}>
      
      {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{eyebrow}</p>}
      <h2
        id={id}
        className={`inline-block -rotate-[1.5deg] bg-peach px-4 py-2 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-ink shadow-soft sm:text-5xl ${
        eyebrow ? 'mt-4' : ''}`
        }>
        
        {title}
      </h2>
      {description && <p className="mt-6 text-lg leading-relaxed text-muted">{description}</p>}
    </motion.div>);

}